import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import { mediTabPage } from '../../Medistock/medistock.tab/medistocktabcontainer';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  public subs : Subscription[] = [];  
  constructor(public navCtrl: NavController, public authservice : AuthService) {

  }
  Login(){
    this.navCtrl.push(mediTabPage);
    // this.subs.push(this.authservice.getAuth(15)
    //         .subscribe((res) => {
    //           console.dir(res);
    //         }, (err) => {
    //         }))
  }
}
