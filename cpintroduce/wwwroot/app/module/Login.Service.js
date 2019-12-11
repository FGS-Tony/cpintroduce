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
var appset_1 = require("../provider/appset");
var core_1 = require("@angular/core");
var LoginService = /** @class */ (function () {
    function LoginService(appset) {
        this.appset = appset;
    }
    LoginService.prototype.doLogin = function () {
        this.appset.setUnitName("username");
        this.appset.setUserName("資訊中心");
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [appset_1.AppSet])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=Login.Service.js.map