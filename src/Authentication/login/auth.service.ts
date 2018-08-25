import { Injectable } from '@angular/core';
import { HttpFactory } from '../../Shared/service/httpservice/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpFactory) {}

    getAuth(){
        return this.http.get('orders', {});
    }
    regAuth(formData) {
        return this.http.post('authentication', {});
    }
}
