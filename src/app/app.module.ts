import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
//import {Login } from '../Authentication/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthModule } from '../AuthModule/Authentication.module';
import { SharedModule } from '../Shared/sharedUtil.module';
import { MedistockModule } from '../Medistock/medistock.module';
import { AppState } from '../app/app.global';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
@NgModule({
  declarations: [
    MyApp
    // AboutPage,
    // ContactPage, 
    // HomePage,
    // TabsPage
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    HttpModule,
    MedistockModule,
    BrowserAnimationsModule,
    // MatButtonModule, 
    // MatCheckboxModule,
    IonicModule.forRoot(MyApp)
  ],
  // exports:[
  //   MatButtonModule, 
  //   MatCheckboxModule,
  //   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage
  ],
  providers: [
    AppState,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
