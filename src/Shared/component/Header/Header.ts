import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { HomePage } from '../../../Medistock/home/home'
import { Nav, NavController } from 'ionic-angular';
import { AppStorage } from '../../service/StorageService/AppStorage';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
@Component({
  selector: 'header',
  templateUrl: 'Header.html'
})
export class Header implements OnInit {

  @ViewChild(Nav) nav: Nav;

  public AuthDetials = {
    UserId: '',
    UserName: '',
    UserRole: '',
    UserType: '',
    SessionId: ''
    //ElapsedTime: parseDate(Date.now())
  };
  constructor(public navCtrl: NavController, private storage: AppStorage) {

  }

  ngOnInit() {
    this.GetAuthDetails();
  }

  @Input() content: any;

  pages: any[] = [
    { title: 'New page sample', component: HomePage }
  ];



  openPage(navComp) {
    this.navCtrl.push(navComp.component);
    //this.nav.insertPages(2,navComp.component);
  }

  GetAuthDetails() {
    try {
      this.storage.Get(AppStorage.SessionId).then(val => {
        if (val) {
          this.AuthDetials.SessionId = String(val);
        }
      });
      this.storage.Get(AppStorage.UserId).then(val => {
        if (val) {
          this.AuthDetials.UserId = String(val);
        }
      });
      this.storage.Get(AppStorage.UserName).then(val => {
        if (val) {
          this.AuthDetials.UserName = String(val);
        }
      });
      this.storage.Get(AppStorage.UserRole).then(val => {
        if (val) {
          this.AuthDetials.UserRole = String(val);
        }
      });
      this.storage.Get(AppStorage.UserType).then(val => {
        if (val) {
          this.AuthDetials.UserType = String(val);
        }
      });
      // this.storage.Get(AppStorage.ElapsedTime).then(val => {
      //   if (val) {
      //     this.AuthDetials.ElapsedTime = parseDate(val);
      //   }
      // });
    } catch (error) {
      throw error;
    }
  }

}
