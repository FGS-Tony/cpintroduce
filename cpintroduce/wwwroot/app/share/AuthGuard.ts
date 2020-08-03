import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUser } from '../provider/IUser';
import { SecurityService } from '../module/Security.Service';
import { Login } from '../provider/login'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSet } from "../provider/appset";
 
@Injectable()  
export class AuthGuard implements CanActivate {

    login: Login;
    iuser: IUser;
    pgid: string;
    constructor(private router: Router, private securityservice: SecurityService,
        private httpClient: HttpClient, private appset: AppSet)
        { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     //   return true;
        if (localStorage.getItem('currentUser')) {        
            this.iuser = JSON.parse(localStorage.getItem('currentUser'));
            this.login = new Login();         
            this.login.pgId = route.data.pg;
            this.login.userNo = this.iuser.user_no;            
            this.httpClient.get(this.appset.api_url + "accounts/checklogin/").subscribe
                ((data: any) => {                              
                    this.login = data;       
                    this.login.pgId = route.data.pg;                
                    if (this.login.isAuthenticated) {
                        this.appset.setUnitName(this.login.unit_Name);
                        this.appset.setUserName(this.login.userName);
                        this.appset.setUnitNo(this.login.unit_No);
                        this.appset.setUserNo(this.login.userNo);
                        this.appset.setIsLogin(this.login.isLogin);
                        this.securityservice.getCheckPgSecurity(this.login).subscribe(
                            (data:any) => {
                                 if (data.pgExecurity) {
                                     return true;
                                 }
                                 else {                                    
                                     this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
                                     return false;
                                    
                                  }    
                                },
                            (error) => console.log(error)
                        )                      
                    }
                    else {
                     
                        this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
                        return false;
                    }
                },
                   (error) => console.log(error)
            );
            return true;
        }
        else
        {
            this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
            return false;
        }
     
    
    }
  
}