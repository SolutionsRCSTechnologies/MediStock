import { AuthService } from '../Auth.service';
import { Subscription } from 'rxjs/Subscription';
import { mediTabPage } from '../../Medistock/medistock.tab/medistocktabcontainer';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AppStorage } from '../../Shared/service/StorageService/AppStorage';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { ViewOrder } from '../../Shared/component/ViewOrder/ViewOrder';
import { Header } from '../../Shared/component/Header/Header';
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'Auth.html',
})
export class AuthComponent implements OnInit {
  loading: Loading;
  registerCredentials = {
    userid: '',
    password: ''
  }

  isLogin: boolean = true;

  public subs: Subscription[] = [];

  user: FormGroup;
  public state = "INITIAL";
  public loginErrorMessage: string = '';
  //public userType = '';
  public emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public passwordpattern = "^([a-zA-Z0-9@*#]{8,15})$";
  public regType = 'OWNER';
  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {

  }
  ngOnInit() {
    this.regType = 'OWNER';
    this.user = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      emailid: new FormControl('', [Validators.required,Validators.pattern(this.emailpattern)]),
      mobileno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      druglicense: new FormControl('', [Validators.required]),
      shopname: new FormControl('',[Validators.required]),
      address: new FormControl('', [Validators.required]),
      // country: new FormControl('', []),
      registrationtype: new FormControl('', [Validators.required]),
      ownerinfo: new FormControl('', []),
      userid: new FormControl('', []),
      ownerid: new FormControl('', []),
      password: new FormControl('', [Validators.required,Validators.pattern(this.passwordpattern)]),
      confirm_password: new FormControl('', [Validators.required,Validators.pattern(this.passwordpattern)])
      // conpassword: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]),
    });
  }
  

  //pattern= 

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  login() {
    //debugger
    this.showLoading();
    //setTimeout
    console.dir(this.registerCredentials);
    //this.navCtrl.push(mediTabPage);
    this.subs.push(this.auth.loginAuth(this.registerCredentials)
      .subscribe((res) => {
        if (res && res.header && res.header.errorcode === 0) {
          console.dir(res);
          let info = res && res.body ? res.body : null;
          this.auth.UpdateAuthStorageInfo(info).then(res => {
            this.auth.GetAuthDetails().then(resu => {
              this.loading.dismiss();
              if (resu && resu.UserId && resu.UserId.length > 0 && resu.SessionId && resu.SessionId.length > 0) {
                //this.navCtrl.push(Header);
                this.navCtrl.push(ViewOrder);
              } else {
                this.loginErrorMessage = 'Login attempt is not successful.';
              }
            })
          });
        } else {
          this.loading.dismiss();
          this.loginErrorMessage = res && res.header && res.header.message && res.header.message.length > 0 ? res.header.message : 'Login attempt is not successful.';
        }
      }, (err) => {
        this.loading.dismiss();
        this.loginErrorMessage = 'Login failed.';
      }))
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  Next() {
    console.log(this.user);
    if (this.user.get('ownerinfo').value == "USER") {
      this.user.get('ownerid').setValidators([Validators.nullValidator]);
      this.user.get('userid').setValidators([Validators.required, Validators.minLength(6)]);
    }
    else {
      this.user.get('userid').setValidators([Validators.nullValidator]);
      this.user.get('ownerid').setValidators([Validators.required, Validators.minLength(6)]);
    }
    this.user.updateValueAndValidity();
    this.state = 'NEXT';
  }

  Back() {
    this.state = "INITIAL";
  }

  Regtype(val) {
    let controls:any=['ownerid','ownerinfo','druglicense','shopname'];
    let isvalidfield:boolean = false;
    let isvalidownerinfo:boolean = false;
    //this.userType = val;
    if (val == "USER") {
      isvalidfield = false;
      isvalidownerinfo = true;
    }
    else {
      isvalidfield = true;
      isvalidownerinfo = false;
    }
    this.user.updateValueAndValidity();

    controls.forEach(element => {
      if(element != 'ownerinfo' && element != 'ownerid') this.setresetcontrol(element,isvalidfield);
      if(element == 'ownerinfo' || element == 'ownerid') this.setresetcontrol(element,isvalidownerinfo);
    });

  }

  get customformvalidation(){
    if(this.user.get('confirm_password').value == this.user.get('password').value){
      return false;
    }
    else{
      return true;
    }
  }

  backtologin(){
    this.isLogin = true
    this.state = 'INITIAL';
  }

  setresetcontrol(controlname,valid){
     this.user.removeControl(controlname);
     let control:FormControl;
     if(valid){
        control = new FormControl([],[Validators.required]);
     }
     else{
        control = new FormControl([],[Validators.nullValidator]);
     }
     this.user.setControl(controlname,control);
  }

  onSubmit(userdata) {
    console.log(userdata);
    this.subs.push(this.auth.regAuth(userdata.value)
      .subscribe((res) => {
        console.dir(res);
      }, (err) => {
      }));
  }
}
