import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { AppSet } from "../provider/appset";
import { Login } from '../provider/login';
@Injectable()
export class SecurityService {
    public login: Login;
    constructor(private http:HttpClient ,private appset:AppSet) { }

    public getUser() {
        return this.http.get(this.appset.api_url + "accounts/GetUser");
    }

    public getUnit() {
        return this.http.get(this.appset.api_url + "accounts/GetUnit");
    }

    public getUserGroup(data: any) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //   let options = new RequestOptions({ headers: headers });
        return this.http.post(this.appset.api_url + "accounts/getUserGroup", data, { headers: headers });
    }
    public getCheckPgSecurity(data: any) {
      
        this.login = new Login();
        this.login.userNo = data.userNo;
        this.login.pgId = data.pgId;
       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
      //  let options = new RequestOptions({ headers: headers });
        return this.http.post(this.appset.api_url + "accounts/GetCheckPgSecurity", JSON.stringify(this.login), { headers: headers });
    }
    
}
