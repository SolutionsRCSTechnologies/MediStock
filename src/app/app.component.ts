import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Login } from '../Authentication/login/login';
import {AppState} from '../app/app.global';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Login;
  themes = [
    { title: 'Default Red Theme', theme: 'theme-red', color:'assets/imgs/FF0000.png' },
    { title: 'Noir Theme', theme: 'theme-dark', color:'assets/imgs/333333.png' }
  ];
  currentTheme:string = '';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public global:AppState) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); 
    });
  }
  changeTheme(val){
    this.global.set('theme', val); 
     this.currentTheme = val;
  }
}
