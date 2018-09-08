import { Component,Input,ViewChild } from '@angular/core';
import { HomePage} from '../../../Medistock/home/home'
import { Nav, Platform, NavController } from 'ionic-angular';
@Component({
  selector: 'header',
  templateUrl: 'Header.html'
})
export class Header {
  
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {

  }
  
  @Input() content: any;

  pages:any[] = [
    { title: 'New page sample', component: HomePage}
  ];

  openPage(navComp){
    this.navCtrl.push(navComp.component);
    //this.nav.insertPages(2,navComp.component);
  }
  
}
