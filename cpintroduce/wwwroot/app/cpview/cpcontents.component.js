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
var http_1 = require("@angular/common/http");
var appset_1 = require("../provider/appset");
var Bclass_1 = require("../provider/Bclass");
var CpContentsComponent = /** @class */ (function () {
    function CpContentsComponent(http, appset) {
        this.http = http;
        this.appset = appset;
        this.save = new core_1.EventEmitter();
        this.cpchapterno = 0;
        this.queryUrl = "cpchapter/getcpchapterbyno";
        this.opened = false;
        this.opened1 = false;
        this.saveUrl = "cpchapter";
        this.action = "updatecontents";
        this.hostUpload = "/api/image/UploadImage";
        this.uploadFolder = "images";
    }
    Object.defineProperty(CpContentsComponent.prototype, "chapterno", {
        set: function (chapter_no) {
            var _this = this;
            this.cpchapterno = chapter_no;
            this.http.get(this.appset.api_url + this.queryUrl + "/" + chapter_no).
                subscribe(function (data) {
                _this.cpchapter_name = data[0].cpchapter_name;
                _this.cpchapter_contents = data[0].cpchapter_contents;
            }, function (error) { return console.log(error); });
            //   this.editService
        },
        enumerable: true,
        configurable: true
    });
    CpContentsComponent.prototype.ngOnInit = function () {
    };
    CpContentsComponent.prototype.edit = function () {
        this.opened = true;
    };
    CpContentsComponent.prototype.preview = function () {
        this.opened1 = true;
    };
    CpContentsComponent.prototype.close = function () {
        this.opened = false;
    };
    CpContentsComponent.prototype.close1 = function () {
        this.opened1 = false;
    };
    CpContentsComponent.prototype.submit = function () {
        var _this = this;
        this.cpchapter = new Bclass_1.CpChapter();
        this.cpchapter.cpchapter_no = this.cpchapterno;
        this.cpchapter.cpchapter_name = this.cpchapter_name;
        this.cpchapter.cpchapter_sort = this.cpchapter_sort;
        this.cpchapter.cpchapter_contents = this.cpchapter_contents;
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.appset.api_url + this.saveUrl + "/" + this.action, JSON.stringify(this.cpchapter), { headers: headers }).
            subscribe(function (data) {
            _this.appset.sayAlert("存檔成功");
            _this.opened = false;
            _this.save.emit(_this.cpchapter);
        }, function (error) { console.log(error); _this.appset.sayAlert("存檔失敗"); });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CpContentsComponent.prototype, "save", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CpContentsComponent.prototype, "cpchapter_name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CpContentsComponent.prototype, "cpchapter_contents", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CpContentsComponent.prototype, "cpchapter_sort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CpContentsComponent.prototype, "chapterno", null);
    CpContentsComponent = __decorate([
        core_1.Component({
            selector: 'cp-contents',
            templateUrl: 'cppages/cpcontentscomponent',
            styles: ['img { width:270px;height:270px }']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet])
    ], CpContentsComponent);
    return CpContentsComponent;
}());
exports.CpContentsComponent = CpContentsComponent;
//# sourceMappingURL=cpcontents.component.js.map