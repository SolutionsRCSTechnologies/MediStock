import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppStorage } from '../../service/StorageService/AppStorage';
import { LogoutComponent } from '../../../AuthModule/Logout/Logout';

@Component({
  selector: 'vieworder',
  templateUrl: 'ViewOrder.html'
})
export class ViewOrder implements OnInit {

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

  Logout() {
    this.navCtrl.push(LogoutComponent);
  }

}
