import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmModule } from './em/em.module';

import { HttpService } from './http-service.service';
import { LocalStorage } from './em/common/local.storage';
import {InterceptorService} from "./InterceptorService";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmModule
  ],
  providers: [HttpService,LocalStorage,{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
