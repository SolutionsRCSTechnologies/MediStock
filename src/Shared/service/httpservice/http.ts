import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { APIEndpoints } from './APIEndpoints';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpFactory {

    private baseUrl = 'http://localhost:3001/';
    private _headers: any;
 
    constructor(private http: Http) {
    }

    resetheader() {
        this._headers = {};
    }

    get(endpointRef, paramsObj, urlParams?) {
        let apiUrl: string = this.baseUrl.concat(this.getApiEndPointUrl(endpointRef));
        if (urlParams) apiUrl = apiUrl.concat('/').concat(urlParams);
        let params: URLSearchParams = new URLSearchParams();
        for (let param in paramsObj) {
            params.set(param, paramsObj[param])
        }
        let header: Headers = this.getHeaders();
        return this.http.get(apiUrl, {
            params: params,
            headers: header
        }).map((res: Response) => {
            this.resetheader();
            return res.json();
        }).catch((error: any) => {
                this.handleErrors(error.json());
                return Observable.throw(error.json())
            });

       

    }

    post(endpointRef, postData) {
        let apiUrl: string = this.baseUrl.concat(this.getApiEndPointUrl(endpointRef));
        // Logger.log(JSON.stringify(postData));
        return this.http.post(apiUrl, JSON.stringify(postData), { headers: this.getHeaders() })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                this.handleErrors(error.json());
                return Observable.throw(error.json())
            });
    }

    put(endpointRef, postData) {
        let apiUrl: string = this.baseUrl.concat(this.getApiEndPointUrl(endpointRef));
        // Logger.log(JSON.stringify(postData));
        return this.http.put(apiUrl, JSON.stringify(postData), { headers: this.getHeaders() })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                this.handleErrors(error.json());
                return Observable.throw(error.json())
            });
    }

    delete(endpointRef, paramsObj, urlParams?) {
        let apiUrl: string = this.baseUrl.concat(this.getApiEndPointUrl(endpointRef));
        if (urlParams) apiUrl = apiUrl.concat('/').concat(urlParams);
        let params: URLSearchParams = new URLSearchParams();
        for (let param in paramsObj) {
            params.set(param, paramsObj[param])
        }
        return this.http.delete(apiUrl, { params: params })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                this.handleErrors(error.json());
                return Observable.throw(error.json())
            });
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getApiEndPointUrl(endpointRef) {
        let endpointUrl: string;
        for (let endpoint in APIEndpoints) {
            if (endpoint === endpointRef) endpointUrl = APIEndpoints[endpoint]
        }
        if (endpointUrl) {
            return endpointUrl;
        }
        else {
            console.log(`No endpoint URL defined for ${endpointRef} in APIEndpoint.ts`, )
        }
    }

    handleErrors({ baseStatus, errorMsg }) {
        
    }

}