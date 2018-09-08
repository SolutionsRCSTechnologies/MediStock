import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewOrder } from './component/ViewOrder/ViewOrder';
import { Header } from './component/Header/Header';
import { HeaderNav } from './component/HeaderNav/HeaderNav';
import { Footer } from './component/Footer/Footer';
import { HttpFactory } from './service/httpservice/http';
@NgModule({
  declarations: [ViewOrder,Header,Footer,HeaderNav],
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
    ViewOrder,Header,HeaderNav,Footer
  ]
})
export class SharedModule {}
