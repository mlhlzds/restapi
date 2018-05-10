import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './em/login/login.component'
import { MenuComponent } from './em/menu/menu.component'
import { LoginGuard } from './LocalStorage'
import { RoleComponent } from './em/role/role.component'
import { UserComponent } from './em/user/user.component';

const appChildRoutes: Routes = [
  { path: "user", component: UserComponent },
  { path: "role", component: RoleComponent },

  // 如果地址栏中输入没有定义的路由就跳转到one路由界面
  {
    path: '**', redirectTo: "user"
  }
];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu', component: MenuComponent, canActivate: [LoginGuard],
    children: appChildRoutes 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }