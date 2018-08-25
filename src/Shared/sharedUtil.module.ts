//Default imports
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Templates
import { ViewOrder } from './ViewOrder/ViewOrder';

//Entity Classes
import { Order } from './Entities/Order';

//Services

@NgModule({
  declarations: [
    ViewOrder,
    Order
  ],
  imports: [
    BrowserModule,
    IonicModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [
    ViewOrder,
    Order
  ]
})
export class SharedModule {}
