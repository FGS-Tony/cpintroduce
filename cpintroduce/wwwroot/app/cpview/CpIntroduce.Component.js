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
exports.CpIntroduceComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var appset_1 = require("../provider/appset");
var ICpintroduce_1 = require("../provider/ICpintroduce");
var CpIntroduceComponent = /** @class */ (function () {
    function CpIntroduceComponent(http, appset) {
        this.http = http;
        this.appset = appset;
        this.hostUpload = "/api/image/UploadImage";
        this.uploadFolder = "images";
        this.action = "create";
    }
    CpIntroduceComponent.prototype.ngOnInit = function () {
        this.getIntrduce();
        this.insertData();
    };
    CpIntroduceComponent.prototype.updateIntrduce = function () {
        this.cpintro_no = this.cpintroduce.cpintro_no;
        this.cpintro_preface = this.cpintroduce.cpintro_preface;
        this.cpintro_intro = this.cpintroduce.cpintro_intro;
        this.cpintro_master = this.cpintroduce.cpintro_master;
        this.cpintro_masterroad = this.cpintroduce.cpintro_masterroad;
        //this.formGroup = new FormGroup({
        //    "cpintro_no": new FormControl(this.cpintroduce.cpintro_no),
        //    "cpintro_preface": new FormControl(this.cpintroduce.cpintro_preface),
        //    "cpintro_intro": new FormControl(this.cpintroduce.cpintro_intro),
        //    "cpintro_master": new FormControl(this.cpintroduce.cpintro_master)
        //});
        this.action = "update";
    };
    CpIntroduceComponent.prototype.insertData = function () {
        this.cpintro_no = 0;
        this.cpintro_preface = " ";
        this.cpintro_intro = " ";
        this.cpintro_master = " ";
        this.cpintro_masterroad = " ";
        //this.formGroup = new FormGroup({
        //    "cpintro_no": new FormControl(0),
        //    "cpintro_preface": new FormControl(""),
        //    "cpintro_intro": new FormControl(""),
        //    "cpintro_master": new FormControl("")
        //});
        this.action = "create";
    };
    CpIntroduceComponent.prototype.saveIntrduce = function () {
        var _this = this;
        //let cpdata = this.formGroup.value;
        this.cpintroduce = new ICpintroduce_1.CpIntroduce();
        this.cpintroduce.cpintro_no = this.cpintro_no;
        this.cpintroduce.cpintro_preface = this.cpintro_preface;
        this.cpintroduce.cpintro_intro = this.cpintro_intro;
        this.cpintroduce.cpintro_master = this.cpintro_master;
        this.cpintroduce.cpintro_masterroad = this.cpintro_masterroad;
        var cpdata = JSON.stringify(this.cpintroduce);
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.appset.api_url + "cpintroduce/" + this.action, cpdata, { headers: headers }).subscribe(function (data) {
            if (_this.action == 'update') {
                //  this.formGroup.controls["cpintro_no"].setValue(data.cpintro_no);
                _this.cpintro_no = data.cpintro_no;
                _this.action = "update";
            }
            _this.appset.sayAlert("存檔成功");
        }, function (error) {
            console.log(error),
                _this.appset.sayAlert("存檔失敗");
        });
    };
    CpIntroduceComponent.prototype.getIntrduce = function () {
        var _this = this;
        this.http.get(this.appset.api_url + "cpintroduce/getcpintroduce").subscribe(function (data) {
            if (data.isdata > 0) {
                _this.cpintroduce = data.cpintroducedata;
                _this.updateIntrduce();
            }
            else {
                _this.insertData();
            }
        }, function (error) { console.log(error); });
    };
    CpIntroduceComponent = __decorate([
        (0, core_1.Component)({
            selector: 'cp-intrduce',
            templateUrl: 'cppages/cpintroducecomponent',
            styles: ['img { width:270px;height:270px }']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet])
    ], CpIntroduceComponent);
    return CpIntroduceComponent;
}());
exports.CpIntroduceComponent = CpIntroduceComponent;
//# sourceMappingURL=CpIntroduce.Component.js.map