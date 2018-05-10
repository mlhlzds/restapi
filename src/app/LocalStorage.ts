import { Injectable }     from '@angular/core';
import { CanActivate } from "@angular/router";
import { Router} from '@angular/router'; //导入router服务
import { LocalStorage } from './em/common/local.storage'


// 如果所创建的服务不依赖于其他对象，是可以不用使用 Injectable 类装饰器。
// 但当该服务需要在构造函数中注入依赖对象，就需要使用 Injectable 装饰器。
// 不过比较推荐的做法不管是否有依赖对象，在创建服务时都使用 Injectable 类装饰器。
@Injectable()
export class LoginGuard implements CanActivate {

    constructor(public local: LocalStorage, private router: Router) {
    }
    canActivate() {
        let user = this.local.get("user");

        if (user) {
            console.log("用户登录成功！");
             return true;
        } else {
            console.log("用户登录失败！");
            this.router.navigateByUrl("login") 
            return false;
        }
       
    }
}