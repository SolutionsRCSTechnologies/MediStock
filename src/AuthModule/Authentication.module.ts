import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../Shared/sharedUtil.module';
import { MedistockModule } from '../Medistock/medistock.module';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthComponent } from './Auth/Auth';
import { AuthService } from './Auth.service';
import { LogoutComponent } from './Logout/Logout';

@NgModule({
  declarations: [AuthComponent, LogoutComponent],
  imports: [
    BrowserModule,
    SharedModule,
    MedistockModule,
    IonicModule.forRoot(AuthComponent)
  ],
  //bootstrap: [IonicApp],
  //entryComponents: [Login
  //],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  entryComponents: [LogoutComponent]
})
export class AuthModule { }
