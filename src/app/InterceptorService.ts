import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router'; //导入router服务
@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private router: Router) { //注入路由
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            url: (req.url)  //对任意请求的url添加token参数
        });

        return next.handle(authReq).pipe(mergeMap((event: any) => {
            
            //如果code等于222222，用户没有登录跳转到登录页面
            console.log("111111111111111111111111111111111");
            console.log(event);
            if (event instanceof HttpResponse && event.status == 222222) {
                this.router.navigateByUrl("login");
                return;
            }
            
            if (event instanceof HttpResponse && event.status != 200) {
                return ErrorObservable.create(event);
            }
            return Observable.create(observer => {

                observer.next(event)
            }); //请求成功返回响应
        }),
            catchError((res: HttpResponse<any>) => {   //请求失败处理

                console.log(res);
                switch (res.status) {
                    case 401:
                        break;
                    case 200:
                        console.log('业务错误');
                        break;
                    case 404:
                        break;
                    case 403:
                        console.log('业务错误');
                        break;
                }
                return ErrorObservable.create(event);
            }));
    }
}
