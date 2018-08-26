import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage} from '../home/home'

@Component({
  selector: 'meditab',
  templateUrl: 'medistocktabcontainer.html'
})
export class mediTabPage {
  constructor(public navCtrl:NavController) {

  }

  pages:any[] = [
    { title: 'New page sample', component: HomePage}
  ];

  tab2Root = AboutPage;
  tab3Root = ContactPage;

  openPage(navComp){
    this.navCtrl.push(navComp.component);
  }
}
