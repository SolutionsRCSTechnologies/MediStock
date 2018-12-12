import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import { mediTabPage } from '../../Medistock/medistock.tab/medistocktabcontainer';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import {  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login implements OnInit {
  loading: Loading;
  registerCredentials = {
   content:  { userid: '', password: '' }
  }

  isLogin:boolean = true;

  public subs : Subscription[] = []; 

  user: FormGroup;
  public state = "INITIAL";

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    
  }
  ngOnInit(){
    this.user = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      emailid: new FormControl('', [Validators.required,Validators.email]),
      mobileno: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      druglicense: new FormControl('', []),
      shopname: new FormControl('', []),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', []),
      registrationtype: new FormControl('', [Validators.required]),
      ownerinfo: new FormControl('', []),
      userid: new FormControl('', []),
      ownerid: new FormControl('', []),
      password: new FormControl('', [Validators.required]),
      // conpassword: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]),
      });
  }

 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  login(){
    debugger
    this.showLoading();
    //setTimeout
    console.dir(this.registerCredentials);
    //this.navCtrl.push(mediTabPage);
    this.subs.push(this.auth.loginAuth(this.registerCredentials)
            .subscribe((res) => {
              console.dir(res);
            }, (err) => {
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

  Next(){
    console.log(this.user);
    if(this.user.get('ownerinfo').value == "USER"){
      this.user.get('ownerid').setValidators([Validators.nullValidator]);
      this.user.get('userid').setValidators([Validators.required,Validators.minLength(6)]);
    }
    else{
      this.user.get('userid').setValidators([Validators.nullValidator]);
      this.user.get('ownerid').setValidators([Validators.required,Validators.minLength(6)]);
    }
    this.user.updateValueAndValidity();
    this.state = 'NEXT';
  }

  Back(){
    this.state = "INITIAL";
  }

  Regtype(val){
    if(val == "USER"){
      this.user.get('ownerinfo').setValidators([Validators.required]);
      this.user.get('country').setValidators([Validators.nullValidator]);
      this.user.get('druglicense').setValidators([Validators.nullValidator]);
      this.user.get('shopname').setValidators([Validators.nullValidator]);
    }
    else{
      this.user.get('ownerinfo').setValidators([Validators.nullValidator]);
      this.user.get('country').setValidators([Validators.required]);
      this.user.get('druglicense').setValidators([Validators.required]);
      this.user.get('shopname').setValidators([Validators.required]);
    }
    this.user.updateValueAndValidity();
  }

  onSubmit(userdata){
    console.log(userdata);
    this.subs.push(this.auth.regAuth(userdata.value)
    .subscribe((res) => {
      console.dir(res);
    }, (err) => {
    }))
  }
}
