import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  headernavObj : any = {
    title: 'Contact page'
  };
  
  constructor(public navCtrl: NavController) {

  }
  
}
