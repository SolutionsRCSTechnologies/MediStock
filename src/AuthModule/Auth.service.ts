import { Injectable } from '@angular/core';
import { HttpFactory } from '../Shared/service/httpservice/http';
import { AppStorage } from '../Shared/service/StorageService/AppStorage';

@Injectable()
export class AuthService {
    constructor(private http: HttpFactory, private storage: AppStorage) { }

    getAuth() {
        return this.http.get('orders', {});
    }
    // regAuth(formData) {
    //     return this.http.post('authentication', {});
    // }
    loginAuth(formData) {
        //debugger
        return this.http.post('loginAuth', {}, formData);
    }

    regAuth(formData) {
        let reqData: any = {};
        if (formData.registrationtype == "USER") {
            reqData = {
                registrationtype: "USER",
                ownerid: formData.ownerinfo,
                users: {
                    userid: formData.userid,
                    password: formData.password,
                    firstname: formData.firstname,
                    emailid: formData.emailid,
                    mobileno: formData.mobileno,
                    address: formData.address
                }
            }
        }
        else {
            reqData = formData;
        }
        return this.http.post('regAuth', reqData, {});
    }

    logoutAuth(header) {
        return this.http.post('logout', {}, header);
    }

    async UpdateAuthStorageInfo(res) {
        try {
            console.log(10);
            if (res) {
                if (res.sessionid) {
                    await this.storage.Set(AppStorage.SessionId, res.sessionid);
                }
                if (res.userid) {
                    await this.storage.Set(AppStorage.UserId, res.userid);
                }
                if (res.username) {
                    await this.storage.Set(AppStorage.UserName, res.username);
                }
                if (res.userrole) {
                    await this.storage.Set(AppStorage.UserRole, res.userrole);
                }
                if (res.type) {
                    await this.storage.Set(AppStorage.UserType, res.type);
                }
                if (res.elapsedtime) {
                    await this.storage.Set(AppStorage.ElapsedTime, res.elapsedtime);
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async GetAuthDetails() {
        let AuthDetials = {
            UserId: '',
            UserName: '',
            UserRole: '',
            UserType: '',
            SessionId: ''
            //ElapsedTime: parseDate(Date.now())
        };
        try {
            await this.storage.Get(AppStorage.SessionId).then(val => {
                if (val) {
                    AuthDetials.SessionId = String(val);
                }
            });
            await this.storage.Get(AppStorage.UserId).then(val => {
                if (val) {
                    AuthDetials.UserId = String(val);
                }
            });
            await this.storage.Get(AppStorage.UserName).then(val => {
                if (val) {
                    AuthDetials.UserName = String(val);
                }
            });
            await this.storage.Get(AppStorage.UserRole).then(val => {
                if (val) {
                    AuthDetials.UserRole = String(val);
                }
            });
            await this.storage.Get(AppStorage.UserType).then(val => {
                if (val) {
                    AuthDetials.UserType = String(val);
                }
            });
            // this.storage.Get(AppStorage.ElapsedTime).then(val => {
            //   if (val) {
            //     AuthDetials.ElapsedTime = parseDate(val);
            //   }
            // });
        } catch (error) {
            throw error;
        }
        return AuthDetials;
    }

}
// https://www.gajotres.net/ionic-2-handling-a-simple-user-authorization/