import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../Shared/sharedUtil.module';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from './about/about';
import { ContactPage } from './contact/contact';
import { mediTabPage } from './medistock.tab/medistocktabcontainer';
@NgModule({
  declarations: [mediTabPage,AboutPage,ContactPage],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(mediTabPage)
  ],
  //bootstrap: [IonicApp],
  entryComponents: [mediTabPage,AboutPage,ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [
    mediTabPage
  ]
})
export class MedistockModule {}
