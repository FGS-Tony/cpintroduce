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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var appset_1 = require("./provider/appset");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(title, http, appset, router) {
        this.title = title;
        this.http = http;
        this.appset = appset;
        this.router = router;
        this.islogin = false;
        this.isPass = false;
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        this.title.setTitle(newTitle);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  this.login = new Login();
        //  this.login.userId = "TEST";
        this.appset.getUnitName().subscribe(function (item) { _this.unitname = item; });
        this.appset.getUserName().subscribe(function (item) { _this.username = item; });
        this.appset.getIsLogin().subscribe(function (item) { _this.islogin = item; });
        //     this.passLogin();
    };
    AppComponent.prototype.passLogin = function () {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            if (this.user == null) {
                this.login.userId == "nouser";
            }
            else {
                this.login.userId = this.user.user_id;
            }
            console.log(this.user);
            var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(this.appset.api_url + "accounts/passlogin", JSON.stringify(this.login), { headers: headers }).subscribe(function (data) {
                _this.login = data;
                if (_this.login.userNo == "error") {
                    localStorage.clear();
                    _this.router.navigate(['/errorpage']);
                    return;
                }
                else {
                    _this.appset.setUnitName(_this.login.unit_Name);
                    _this.appset.setUserName(_this.login.userName);
                    _this.appset.setUnitNo(_this.login.unit_No);
                    _this.appset.setUserNo(_this.login.userNo);
                    _this.appset.setIsLogin(_this.login.isLogin);
                }
            }, function (error) { console.log(error); });
        }
        else {
            this.router.navigate(['/errorpage']);
        }
    };
    AppComponent = __decorate([
        (0, core_1.Component)({
            selector: 'my-app',
            templateUrl: '/home/appComponent'
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title, http_1.HttpClient, appset_1.AppSet, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map