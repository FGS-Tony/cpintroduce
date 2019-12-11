import { Component, OnInit, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Observable, Subscription } from 'rxjs/Rx';
import { IUser } from './provider/IUser';
import { AppSet } from "./provider/appset";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from './provider/Login';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
    selector: 'my-app',
    templateUrl: '/home/appComponent'
})
export class AppComponent implements OnInit {
    constructor(public title: Title, private http: HttpClient, private appset: AppSet, private router: Router) {

    }
    login: Login;
    user: IUser;
    public username: string;
    public unitname: string;
    public islogin: boolean = false;
    public isPass: boolean = false;
    public setTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }
    ngOnInit() {
       
        //  this.login = new Login();
        //  this.login.userId = "TEST";
        this.appset.getUnitName().subscribe(item => { this.unitname = item; });
        this.appset.getUserName().subscribe(item => { this.username = item; });
        this.appset.getIsLogin().subscribe(item => { this.islogin = item; });
   //     this.passLogin();
    }
     

    passLogin() {
        if (localStorage.getItem('currentUser')) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            if (this.user == null) {
                this.login.userId == "nouser";
            }
            else {
                this.login.userId = this.user.user_id;
            }
            console.log(this.user);
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(this.appset.api_url + "accounts/passlogin", JSON.stringify(this.login), { headers: headers }).subscribe(
                (data: any) => {

                    this.login = data;
                    if (this.login.userNo == "error") {
                        localStorage.clear();
                        this.router.navigate(['/errorpage']);
                        return;
                    }
                    else {
                        this.appset.setUnitName(this.login.unit_Name);
                        this.appset.setUserName(this.login.userName);
                        this.appset.setUnitNo(this.login.unit_No);
                        this.appset.setUserNo(this.login.userNo);
                        this.appset.setIsLogin(this.login.isLogin);

                    }

                },
                (error) => { console.log(error) }
            );
        }
        else {
            this.router.navigate(['/errorpage']);
        }
    }
}
