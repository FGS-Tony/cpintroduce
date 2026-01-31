"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AppSet = /** @class */ (function () {
    function AppSet() {
        this.user_name = new BehaviorSubject_1.BehaviorSubject("");
        this.unit_name = new BehaviorSubject_1.BehaviorSubject("");
        this.unit_no = new BehaviorSubject_1.BehaviorSubject("");
        this.user_no = new BehaviorSubject_1.BehaviorSubject("");
        this.teachar_url = "/upload/250X200/";
        this.img_url = "upload/";
        //  public api_url: string = "http://localhost:5000/api/";
        //   public api_url:string = "http://cpintro.fgs.org.tw/api/";
        this.api_url = "http://localhost:5000/api/";
        this.img_host = "http://172.20.5.68:8888";
        this.islogin = new BehaviorSubject_1.BehaviorSubject(false);
        this.mediaurl = "/cpimages";
        this.medialtempurl = "/cpimagestemp";
        this.isPass = new BehaviorSubject_1.BehaviorSubject(false);
        this.sayAlert = function (msg) { };
        this.tw = {
            firstDayOfWeek: 0,
            dayNames: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: '今天',
            clear: '清除'
        };
        this.sayAlert = function (msg) {
            alert(msg);
        };
    }
    AppSet.prototype.setUserNo = function (userno) {
        this.user_no.next(userno);
    };
    AppSet.prototype.setUnitNo = function (unitno) {
        this.unit_no.next(unitno);
    };
    AppSet.prototype.setUnitName = function (unitname) {
        this.unit_name.next(unitname);
    };
    AppSet.prototype.setUserName = function (username) {
        this.user_name.next(username);
    };
    AppSet.prototype.setIsLogin = function (islogin) {
        this.islogin.next(islogin);
    };
    AppSet.prototype.getUnitNo = function () {
        return this.unit_no;
    };
    AppSet.prototype.getUnitName = function () {
        return this.unit_name;
    };
    AppSet.prototype.getUserName = function () {
        return this.user_name;
    };
    AppSet.prototype.getUserNo = function () {
        return this.user_no;
    };
    AppSet.prototype.getIsLogin = function () {
        return this.islogin;
    };
    AppSet.prototype.SetisPass = function (ispass) {
        this.isPass.next(ispass);
    };
    AppSet.prototype.getIsPass = function () {
        return this.isPass;
    };
    AppSet = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AppSet);
    return AppSet;
}());
exports.AppSet = AppSet;
//# sourceMappingURL=appset.js.map