import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http-service.service'
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router'; //导入router服务
import { LocalStorage } from '../common/local.storage'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  btnDisable: boolean = false; //登录按钮是否禁用

  constructor(public local: LocalStorage, private router: Router, private fb: FormBuilder, private http: HttpService, private messageService: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

   
    // console.log(this._transDate(nodes, "id", "ipid")); //传入的值 列表 ，本对象的id，父对象的id  
    // document.write(JSON.stringify(this._transDate(nodes, "id", "ipid")));
  }

  

  /**
   * 登录
   */
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    this.btnDisable = true;  //禁用登录按钮

    //封装请求参数
    let params = {
      username: this.validateForm.controls.userName.value,
      password: this.validateForm.controls.password.value
    };

    this.http.post("/em/user/login", params).subscribe(
      data => {
        if (data['code'] == 100) {
          this.router.navigateByUrl("menu");
          this.local.set("user", data['data']); //保存登录用户
        } else {
          this.btnDisable = false;
          this.messageService.error(data['message']);
        }
      },
      error => {
        this.btnDisable = false;
        console.log(JSON.stringify(error));
        this.messageService.error("系统繁忙，请稍后再试！");
      }
    )

  }

}
