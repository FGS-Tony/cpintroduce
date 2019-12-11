import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUser } from '../provider/IUser';
import { AppSet } from "../provider/appset";
import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from '../provider/Login';
 
@Component({
    selector: 'fgs-passcpintro',
    template: '       <div [ngBusy]="busy"></div>   '

})
 
export class PassCpIntroComponent implements OnInit {
    userid: string;
    user: IUser;
    login: Login;
    busy: string[] = [];
    constructor(        
        private route: ActivatedRoute,private router:Router,
        private location: Location, private appset: AppSet, public http: HttpClient
    ) { }
    public ngOnInit(): void {
        localStorage.clear();
        this.route.params.subscribe(params => {
            this.userid = params['userid'];
            this.login = new Login();
            //let as_userid = this.userno;
            this.login.userId = this.userid;
            this.busy.push("busy");
            let headers = new HttpHeaders().set('Content-Type', 'application/json');          
            this.http.post(this.appset.api_url + "accounts/passlogin", JSON.stringify(this.login), { headers: headers }).subscribe(
                (data: any) => {
                   
                    this.login = data;
                    if (this.login.isLogin) {
                        this.user = {
                            unit_no: this.login.unit_No, unit_name: this.login.unit_Name,
                            user_no: this.login.userNo, user_name: this.login.userName,
                            user_id: this.userid
                        };
                    
                        this.appset.setUnitName(this.login.unit_Name);
                        this.appset.setUserName(this.login.userName);
                        this.appset.setUnitNo(this.login.unit_No);
                        this.appset.setUserNo(this.login.userNo);
                        this.appset.setIsLogin(this.login.isLogin);
                        this.appset.SetisPass(true);
                        this.busy = [];
                        localStorage.setItem("currentUser", JSON.stringify(this.user));
                        this.router.navigate(['/home']);
                    }
                    else {

                        console.log("error");
                        this.appset.setIsLogin(this.login.isLogin);
                        this.router.navigate(['/errorpage']);
                    }
                },
                (error) => {
                  
                    console.log(error);
                    this.appset.setIsLogin(false);
                    this.router.navigate(['/errorpage']);
                }
            );
        });
    }
}