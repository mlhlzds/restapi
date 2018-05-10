import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http-service.service'
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isCollapsed = false;
  constructor(private http: HttpService, private messageService: NzMessageService) { }

  menu:any; //菜单

  _test() {
    this.http.get('/em/user/query').subscribe(
      data => {
        console.log(data);
      },
      error => {

      }
    );
  }
  /**
   * 获取用户菜单
   */
  _getUserMenu(){
    
    let params = {
      id: `1`
    };

    this.http.post("/em/user/getUserMenu", params).subscribe(
      data => {
        if (data['code'] == 100) {
          this.menu = this._transDate(data['data'],"id","parent_id");
        } else {
          this.messageService.error(data['message']);
        }
      },
      error => {
        console.log(JSON.stringify(error));
        this.messageService.error("系统繁忙，请稍后再试！");
      }
    )
  }

  /**
   * 将数组转为树形对象类型
   */
  _transDate(list, idstr, pidstr) {
    var result = [], temp = {};
    for (var i = 0; i < list.length; i++) {
      temp[list[i][idstr]] = list[i];//将nodes数组转成对象类型  
    }
    for (var j = 0; j < list.length; j++) {
      var tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象  
      if (tempVp) {//判断父对象是否存在，如果不存在直接将对象放到第一层  
        if (!tempVp["nodes"]) tempVp["nodes"] = [];//如果父元素的nodes对象不存在，则创建数组  
        tempVp["nodes"].push(list[j]);//将本对象压入父对象的nodes数组  
      } else {
        result.push(list[j]);//将不存在父对象的对象直接放入一级目录  
      }
    }
    return result;
  }

  ngOnInit() {
    this._getUserMenu();
  }

}
