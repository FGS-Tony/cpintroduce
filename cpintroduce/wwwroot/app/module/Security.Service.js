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
exports.SecurityService = void 0;
var core_1 = require("@angular/core");
//import { Http, Headers, RequestOptions } from '@angular/http';
var http_1 = require("@angular/common/http");
var appset_1 = require("../provider/appset");
var login_1 = require("../provider/login");
var SecurityService = /** @class */ (function () {
    function SecurityService(http, appset) {
        this.http = http;
        this.appset = appset;
    }
    SecurityService.prototype.getUser = function () {
        return this.http.get(this.appset.api_url + "accounts/GetUser");
    };
    SecurityService.prototype.getUnit = function () {
        return this.http.get(this.appset.api_url + "accounts/GetUnit");
    };
    SecurityService.prototype.getUserGroup = function (data) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        //   let options = new RequestOptions({ headers: headers });
        return this.http.post(this.appset.api_url + "accounts/getUserGroup", data, { headers: headers });
    };
    SecurityService.prototype.getCheckPgSecurity = function (data) {
        this.login = new login_1.Login();
        this.login.userNo = data.userNo;
        this.login.pgId = data.pgId;
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        //  let options = new RequestOptions({ headers: headers });
        return this.http.post(this.appset.api_url + "accounts/GetCheckPgSecurity", JSON.stringify(this.login), { headers: headers });
    };
    SecurityService = __decorate([
        (0, core_1.Injectable)(),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet])
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
//# sourceMappingURL=Security.Service.js.map