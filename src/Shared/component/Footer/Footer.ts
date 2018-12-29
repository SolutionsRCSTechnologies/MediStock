import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'footer',
  templateUrl: 'Footer.html'
})
export class Footer {

  public Year:any;

  constructor(public navCtrl: NavController) {
    this.Year = new Date().getFullYear();
  }
  
}
