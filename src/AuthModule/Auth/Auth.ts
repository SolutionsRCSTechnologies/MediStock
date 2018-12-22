import { AuthService } from '../Auth.service';
import { Subscription } from 'rxjs/Subscription';
import { mediTabPage } from '../../Medistock/medistock.tab/medistocktabcontainer';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, isActivatable } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AppStorage } from '../../Shared/service/StorageService/AppStorage';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { ViewOrder } from '../../Shared/component/ViewOrder/ViewOrder';
import { Header } from '../../Shared/component/Header/Header';
import { Observable, Subject } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'Auth.html',
})
export class AuthComponent implements OnInit {
  loading: Loading;
  registerCredentials = {
    userid: '',
    password: '',
    sessionid: ''
  };

  nameList: string[] = [];
  IsAvailable: boolean = false;

  userPhrase$ = new Subject<string>();

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
  RegistrationForm(){
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
    });
    }

  ngOnInit() {
    this.auth.GetAuthDetails().then(res => {
      let isValidAuth: boolean = false;
      if (res) {
        console.log(res);
        this.registerCredentials.userid = res.UserId;
        this.registerCredentials.sessionid = res.SessionId;
        let isTemp = this.registerCredentials.userid && this.registerCredentials.userid.length > 0 && this.registerCredentials.sessionid && this.registerCredentials.sessionid.length > 0;
        //console.log(this.registerCredentials);
        //isValidAuth = isTemp && (res.ElapsedTime > new Date());
        isValidAuth = isTemp;
      }
      if (isValidAuth) {
        this.login();
      } else {
        this.regType = 'OWNER';
        this.RegistrationForm();
      }
    });

    //this.subs.push(this.ValidateUserIds(this.userPhrase$).subscribe(obs => obs));

    this.subs.push(this.ValidateUserIds(this.userPhrase$).subscribe(obs => {
      if (obs && obs.header && obs.header.errorcode == 0) {
        console.log(obs.body);
        console.log(obs.header.message);
        let arr: string[] = obs.body;
        let term: string = obs.header.message && obs.header.message.trim().length > 0 ? obs.header.message.trim() : '';
        if (arr && arr.length > 0) {
          arr.forEach(itm => {
            if (itm && itm.length > 0) {
              if (!(this.nameList.findIndex(val => val === itm) != -1)) {
                this.nameList.push(itm);
              }
            }
          });
        }
        if (term && term.length > 0) {
          let reg: RegExp = new RegExp('^' + term.trim());
          console.log(this.nameList.findIndex(val => val.search(reg) != -1));
          this.IsAvailable = !(this.nameList.findIndex(val => val.search(reg) != -1) != -1);
        } else {
          this.IsAvailable = false;
        }
      } else {
        this.IsAvailable = false;
      }
    }));
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
    console.log(this.registerCredentials);
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
            }).catch(err => {
              this.loading.dismiss();
              this.loginErrorMessage = 'Error occurred during information retrieve in local device.';
            });
          }).catch(err => {
            this.loading.dismiss();
            this.loginErrorMessage = 'Error occurred during information save in local device.';
          });
        } else {
          this.loading.dismiss();
          this.loginErrorMessage = res && res.header && res.header.message && res.header.message.length > 0 ? res.header.message : 'Login attempt is not successful.';
        }
      }, (err) => {
        this.loading.dismiss();
        this.loginErrorMessage = 'Login failed.';
      }));
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
  }

  showAlert(text, titleName?) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: titleName && titleName.length > 0 ? titleName : 'Alert',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  Next() {
    console.log(this.user);
    // if (this.user.get('ownerinfo').value == "USER") {
    //   this.user.get('ownerid').setValidators([Validators.nullValidator]);
    //   this.user.get('userid').setValidators([Validators.required, Validators.minLength(6)]);
    // }
    // else {
    //   this.user.get('userid').setValidators([Validators.nullValidator]);
    //   this.user.get('ownerid').setValidators([Validators.required, Validators.minLength(6)]);
    // }
    this.user.get('userid').setValidators([Validators.required, Validators.minLength(6)]);
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
    this.showLoading();
    this.subs.push(this.auth.regAuth(userdata.value)
      .subscribe((res) => {
        console.dir(res);
        this.loading.dismiss();
        if (res && res.header && res.header.errorcode === 0) {
          this.showAlert('Registration is successful', 'Success Message');
          this.navCtrl.push(AuthComponent);
        } else if (res && res.header && res.header.message) {
          this.showError(res.header.message);
        } else {
          this.showError('Registration operation is not completed successfully.');
        }
      }, (err) => {
        this.showError('Error occurred during reistration');
      }));
  }

  GoToNextScreen(userType?: string, screenComp?: any) {
    if (userType && userType.length > 0) {
      //
    } else {
      this.navCtrl.push(ViewOrder);
    }
  }

  IsValidExistingAuth() {
    let retVal: boolean = false;
    try {

    } catch (error) {
      retVal = false;
    }
    return retVal;
  }

  // ValidateUserIds(terms: Observable<string>) {
  //   return terms.debounceTime(500)
  //     .distinctUntilChanged()
  //     .switchMap(term => this.CheckUserNames(term));
  // }

  ValidateUserIds(terms: Observable<string>) {
    return terms.debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => {
        console.log(1);
        let obj: any = {
          header: {
            errocode: 0,
            message: term
          },
          body: []
        };
        if (term && term.trim().length >= 3) {
          let reg: RegExp = new RegExp('^' + term.trim());
          if (this.nameList && this.nameList.length > 0 && (this.nameList.findIndex(val => val.search(reg) != -1) != -1)) {
            return Observable.of(obj);
          } else {
            return this.auth.GetUserNames({ userphrase: term.trim() });
          }
        }
        return Observable.of(obj);
      });
  }

  CheckUserNames(userName: string): Observable<boolean> {
    //let obs: Observable<any> = new Observable<any>();
    return Observable.create(obs => {
      let isAvailable: boolean = false;
      try {
        if (userName && userName.trim().length > 3) {
          userName = userName.trim();
          let reg: RegExp = new RegExp('^' + userName);
          let findInDB: boolean = false;
          if (this.nameList && this.nameList.length > 0) {
            console.log(this.nameList.findIndex(val => val.search(reg) != -1));
            findInDB = !(this.nameList.findIndex(val => val.search(reg) != -1) != -1);
            isAvailable = findInDB;
          } else {
            findInDB = true;
          }
          if (findInDB) {
            this.auth.GetUserNames({ userphrase: userName }).subscribe(obs => {
              if (obs && obs.header && obs.header.errorcode == 0) {
                let items: string[] = obs.body;
                if (items && items.length > 0) {
                  items.forEach(itm => {
                    if (itm && itm.length > 0) {
                      if (!(this.nameList.findIndex(val => val == itm) != -1)) {
                        this.nameList.push(itm);
                      }
                    }
                  });
                  console.log('check');
                  console.log(this.nameList.findIndex(val => val.search(reg) != -1));
                  isAvailable = !(this.nameList.findIndex(val => val.search(reg) != -1) != -1);
                } else {
                  isAvailable = true;
                }
              } else {
                isAvailable = false;
              }
            }, (err) => {
              isAvailable = false;
            });
          }
        } else {
          isAvailable = false;
        }
        console.log(isAvailable);
        //this.IsAvailable = isAvailable;
        console.log(this.nameList);
      } catch (error) {
        isAvailable = false;
      }
      return Observable.of(isAvailable);
    });
  }
}
