import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isDevMode } from '@angular/core';
@Injectable()
export class AppSet {
    
    private user_name = new BehaviorSubject<string>("");
    private unit_name = new BehaviorSubject<string>("");
    private unit_no = new BehaviorSubject<string>("");
    private user_no = new BehaviorSubject<string>("");
    public teachar_url: string = "/upload/250X200/";
    public img_url: string = "upload/";
  //  public api_url: string = "http://localhost:5000/api/";
 //   public api_url:string = "http://cpintro.fgs.org.tw/api/";
   public   api_url : string = "http://localhost:5000/api/";
    public img_host: string = "http://172.20.5.68:8888";
    private islogin = new BehaviorSubject<boolean>(false);
    public uid: string;  
    public login_id: string;
    public login_name: string;
    public mediaurl: string = "/cpimages";
    public medialtempurl: string = "/cpimagestemp";  
    private isPass = new BehaviorSubject<boolean>(false);
    public sayAlert = function(msg:string) { };
    public tw = {
    firstDayOfWeek: 0,
    dayNames: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: '今天',
    clear: '清除'
    };
    constructor() {
        this.sayAlert = (msg:string) => {
            alert(msg);
        }
    
        
    }
    setUserNo(userno: string) {
        this.user_no.next(userno);
    }
    setUnitNo(unitno: string) {
        this.unit_no.next(unitno);
    }
    setUnitName(unitname: string) {
        this.unit_name.next(unitname);
    }
    setUserName(username: string) {
      
        this.user_name.next(username);
     
    }
    setIsLogin(islogin: boolean) {
        this.islogin.next(islogin);
    }
    getUnitNo() {
        return this.unit_no;
    }
    getUnitName() {
       return this.unit_name;
    }
    getUserName() {
        return this.user_name;
    }
    getUserNo() {
        return this.user_no;
    }

    getIsLogin() {
        return this.islogin;
    }

    SetisPass(ispass: boolean) {
        this.isPass.next(ispass);
    }
    getIsPass() {
        return this.isPass;
    }
   
  
}