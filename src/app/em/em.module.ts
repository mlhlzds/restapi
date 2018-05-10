import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TreeComponentComponent } from './utils/tree-component/tree-component.component'
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [LoginComponent,MenuComponent,TreeComponentComponent,UserComponent,RoleComponent]
})
export class EmModule { }
