import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewOrder } from './component/ViewOrder/ViewOrder';
import { HttpFactory } from './service/httpservice/http';
@NgModule({
  declarations: [ViewOrder],
  imports: [
    BrowserModule,
    IonicModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpFactory,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [
    ViewOrder
  ]
})
export class SharedModule {}
