import { Injectable } from '@angular/core';
import { HttpFactory } from '../../Shared/service/httpservice/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpFactory) {}

    getAuth(){
        return this.http.get('orders', {});
    }
    // regAuth(formData) {
    //     return this.http.post('authentication', {});
    // }
    loginAuth(formData){
        debugger
            return this.http.post('loginAuth', formData);
    }

    regAuth(formData){
        let reqData:any = {};
        if(formData.registrationtype == "USER"){
            reqData = {
                registrationtype: "USER",
                ownerid:  formData.ownerinfo,
                users: {
                    userid:formData.userid,
                    password: formData.password,
                    firstname:formData.firstname,
                    emailid:formData.emailid,
                    mobileno: formData.mobileno,
                    address: formData.address
                }           
            }
        }
        else{
            reqData = formData;
        }
            return this.http.post('regAuth', reqData,{});
    }
    
}
// https://www.gajotres.net/ionic-2-handling-a-simple-user-authorization/