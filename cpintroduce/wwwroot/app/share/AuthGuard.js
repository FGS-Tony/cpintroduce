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
var router_1 = require("@angular/router");
var Security_Service_1 = require("../module/Security.Service");
var login_1 = require("../provider/login");
var http_1 = require("@angular/common/http");
var appset_1 = require("../provider/appset");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, securityservice, httpClient, appset) {
        this.router = router;
        this.securityservice = securityservice;
        this.httpClient = httpClient;
        this.appset = appset;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            this.iuser = JSON.parse(localStorage.getItem('currentUser'));
            this.login = new login_1.Login();
            this.login.pgId = route.data.pg;
            this.login.userNo = this.iuser.user_no;
            this.httpClient.get(this.appset.api_url + "accounts/checklogin/").subscribe(function (data) {
                _this.login = data;
                _this.login.pgId = route.data.pg;
                if (_this.login.isAuthenticated) {
                    _this.appset.setUnitName(_this.login.unit_Name);
                    _this.appset.setUserName(_this.login.userName);
                    _this.appset.setUnitNo(_this.login.unit_No);
                    _this.appset.setUserNo(_this.login.userNo);
                    _this.appset.setIsLogin(_this.login.isLogin);
                    _this.securityservice.getCheckPgSecurity(_this.login).subscribe(function (data) {
                        if (data.pgExecurity) {
                            return true;
                        }
                        else {
                            _this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
                            return false;
                        }
                    }, function (error) { return console.log(error); });
                }
                else {
                    return true;
                    _this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            }, function (error) { return console.log(error); });
            return true;
        }
        else {
            this.router.navigate(['/errorpage'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, Security_Service_1.SecurityService,
            http_1.HttpClient, appset_1.AppSet])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map