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
      console.log(4);
      this.storage.Get(AppStorage.AuthDetails).then(val => {
        if (val) {
          console.log(val);
          this.AuthDetials.SessionId = val.SessionId ? String(val.SessionId) : '';
          this.AuthDetials.UserId = val.UserId ? String(val.UserId) : '';
          this.AuthDetials.UserName = val.UserName ? String(val.UserName) : '';
          this.AuthDetials.UserRole = val.UserRole ? String(val.UserRole) : '';
          this.AuthDetials.UserType = val.UserType ? String(val.UserType) : '';
          console.log(5);
        }
      }).catch(e => {
        console.log(e);
      });
    } catch (error) {
      throw error;
    }
  }

  Logout() {
    this.navCtrl.push(LogoutComponent);
  }

}
