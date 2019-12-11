import { Observable } from 'rxjs/Rx';
import { AppSet } from "../provider/appset";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class LoginService {

    constructor (private  appset:AppSet) {

    }
    public doLogin() {
        this.appset.setUnitName("username");
        this.appset.setUserName("資訊中心");
    }
}