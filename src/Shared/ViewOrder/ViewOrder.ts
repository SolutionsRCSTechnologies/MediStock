import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Order } from '../Entities/Order';

@Component({
  selector: 'vieworder',
  templateUrl: 'ViewOrder.html'
})
export class ViewOrder {

  constructor(public navCtrl: NavController) {

  }

  public orderlst:Order[]=null;
   
}
