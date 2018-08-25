import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../Shared/sharedUtil.module';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from './login/login';
import { AuthService } from './login/auth.service';
@NgModule({
  declarations: [Login],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(Login)
  ],
  //bootstrap: [IonicApp],
  //entryComponents: [Login
  //],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AuthModule {}
