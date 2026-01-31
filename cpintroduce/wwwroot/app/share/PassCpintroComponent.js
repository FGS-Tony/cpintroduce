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
exports.PassCpIntroComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var appset_1 = require("../provider/appset");
//import { Http, Headers, RequestOptions } from '@angular/http';
var http_1 = require("@angular/common/http");
var Login_1 = require("../provider/Login");
var PassCpIntroComponent = /** @class */ (function () {
    function PassCpIntroComponent(route, router, location, appset, http) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.appset = appset;
        this.http = http;
        this.busy = [];
    }
    PassCpIntroComponent.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.clear();
        this.route.params.subscribe(function (params) {
            _this.userid = params['userid'];
            _this.login = new Login_1.Login();
            //let as_userid = this.userno;
            _this.login.userId = _this.userid;
            _this.busy.push("busy");
            var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            _this.http.post(_this.appset.api_url + "accounts/passlogin", JSON.stringify(_this.login), { headers: headers }).subscribe(function (data) {
                _this.login = data;
                if (_this.login.isLogin) {
                    _this.user = {
                        unit_no: _this.login.unit_No, unit_name: _this.login.unit_Name,
                        user_no: _this.login.userNo, user_name: _this.login.userName,
                        user_id: _this.userid
                    };
                    _this.appset.setUnitName(_this.login.unit_Name);
                    _this.appset.setUserName(_this.login.userName);
                    _this.appset.setUnitNo(_this.login.unit_No);
                    _this.appset.setUserNo(_this.login.userNo);
                    _this.appset.setIsLogin(_this.login.isLogin);
                    _this.appset.SetisPass(true);
                    _this.busy = [];
                    localStorage.setItem("currentUser", JSON.stringify(_this.user));
                    _this.router.navigate(['/home']);
                }
                else {
                    console.log("error");
                    _this.appset.setIsLogin(_this.login.isLogin);
                    _this.router.navigate(['/errorpage']);
                }
            }, function (error) {
                console.log(error);
                _this.appset.setIsLogin(false);
                _this.router.navigate(['/errorpage']);
            });
        });
    };
    PassCpIntroComponent = __decorate([
        (0, core_1.Component)({
            selector: 'fgs-passcpintro',
            template: '       <div [ngBusy]="busy"></div>   '
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router,
            common_1.Location, appset_1.AppSet, http_1.HttpClient])
    ], PassCpIntroComponent);
    return PassCpIntroComponent;
}());
exports.PassCpIntroComponent = PassCpIntroComponent;
//# sourceMappingURL=PassCpintroComponent.js.map