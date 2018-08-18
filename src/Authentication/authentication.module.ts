import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from './login/login'
@NgModule({
  declarations: [Login],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Login)
  ],
  //bootstrap: [IonicApp],
  //entryComponents: [Login
  //],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AuthModule {}
