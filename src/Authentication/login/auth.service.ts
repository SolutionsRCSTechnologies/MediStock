import { Injectable } from '@angular/core';
import { HttpFactory } from '../../Shared/service/httpservice/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpFactory) {}

    getAuth(authNo){
        return this.http.get('getauthentication', {},authNo);
    }
    regAuth(formData) {
        return this.http.post('authentication', {});
    }
}
