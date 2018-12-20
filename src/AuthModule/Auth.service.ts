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
        return this.http.post('logoutAuth', {}, header);
    }

    async UpdateAuthStorageInfo(res) {
        let authDetails: AuthDetails = new AuthDetails();
        try {
            if (res) {
                if (res.sessionid) {
                    //await this.storage.Set(AppStorage.SessionId, res.sessionid);
                    authDetails.SessionId = res.sessionid;
                }
                if (res.userid) {
                    //await this.storage.Set(AppStorage.UserId, res.userid);
                    authDetails.UserId = res.userid;
                }
                if (res.username) {
                    //await this.storage.Set(AppStorage.UserName, res.username);
                    authDetails.UserName = res.username;
                }
                if (res.userrole) {
                    //await this.storage.Set(AppStorage.UserRole, res.userrole);
                    authDetails.UserRole = res.userrole;
                }
                if (res.usertype) {
                    //await this.storage.Set(AppStorage.UserType, res.type);
                    authDetails.UserType = res.usertype;
                }
                if (res.elapsedtime) {
                    //await this.storage.Set(AppStorage.ElapsedTime, res.elapsedtime);
                    authDetails.ElapsedTime = res.elapsedtime;
                }

                await this.storage.Set(AppStorage.AuthDetails, authDetails);
            }
        } catch (error) {
            throw error;
        }
        return authDetails;
    }

    async GetAuthDetails() {
        // let AuthDetials = {
        //     UserId: '',
        //     UserName: '',
        //     UserRole: '',
        //     UserType: '',
        //     SessionId: ''
        //     //ElapsedTime: parseDate(Date.now())
        // };
        let authDetails: AuthDetails = new AuthDetails();
        try {
            // await this.storage.Get(AppStorage.SessionId).then(val => {
            //     if (val) {
            //         AuthDetials.SessionId = String(val);
            //     }
            // });
            // await this.storage.Get(AppStorage.UserId).then(val => {
            //     if (val) {
            //         AuthDetials.UserId = String(val);
            //     }
            // });
            // await this.storage.Get(AppStorage.UserName).then(val => {
            //     if (val) {
            //         AuthDetials.UserName = String(val);
            //     }
            // });
            // await this.storage.Get(AppStorage.UserRole).then(val => {
            //     if (val) {
            //         AuthDetials.UserRole = String(val);
            //     }
            // });
            // await this.storage.Get(AppStorage.UserType).then(val => {
            //     if (val) {
            //         AuthDetials.UserType = String(val);
            //     }
            // });

            // this.storage.Get(AppStorage.ElapsedTime).then(val => {
            //   if (val) {
            //     AuthDetials.ElapsedTime = parseDate(val);
            //   }
            // });

            await this.storage.Get(AppStorage.AuthDetails).then(res => {
                if (res) {
                    authDetails.ElapsedTime = res.ElapsedTime;
                    authDetails.SessionId = res.SessionId;
                    authDetails.UserId = res.UserId;
                    authDetails.UserName = res.UserName;
                    authDetails.UserRole = res.UserRole;
                    authDetails.UserType = res.UserType;
                }
            });
        } catch (error) {
            throw error;
        }
        return authDetails;
    }

    GetUserNames(data) {
        console.log(data);
        return this.http.post('getUserIds', data, {});
    }

}

class AuthDetails {
    public UserId: string = '';
    public UserName: string = '';
    public UserType: string = '';
    public UserRole: string = '';
    public SessionId: string = '';
    public ElapsedTime: Date = new Date();
}
// https://www.gajotres.net/ionic-2-handling-a-simple-user-authorization/