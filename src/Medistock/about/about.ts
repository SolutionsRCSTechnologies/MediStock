import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  headernavObj : any = {
    title: 'About page'
  };
  constructor(public navCtrl: NavController) {

  }

}
