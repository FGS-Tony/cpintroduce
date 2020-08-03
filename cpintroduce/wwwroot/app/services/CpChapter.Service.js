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
var appset_1 = require("../provider/appset");
var http_1 = require("@angular/common/http");
var map_1 = require("rxjs/operators/map");
var CpChapterServices = /** @class */ (function () {
    function CpChapterServices(http, appset) {
        this.http = http;
        this.appset = appset;
        this.cpbclassurl = "cpbclass/getcpbclassetreedata";
        this.cpbookurl = "cpbook/getcpbookbybclass/";
        this.cpchapterurl = "cpchapter/getcpchapterbybook/";
        this.cpchapterurl1 = "cpchapter/getcpchapterbychapter/";
        this.cpcontentsurl = "cpcontents/getcpcontentsbychapter/";
    }
    CpChapterServices.prototype.GetCpBclass = function () {
        return this.http.get(this.appset.api_url + this.cpbclassurl)
            .pipe(map_1.map(function (data) { return data; }));
    };
    CpChapterServices.prototype.GetCpBookByBclass = function (cpbclassno) {
        return this.http.get(this.appset.api_url + this.cpbookurl + cpbclassno)
            .pipe(map_1.map(function (data) { return data; }));
    };
    CpChapterServices.prototype.GetCpChapterByBook = function (cpbookno) {
        return this.http.get(this.appset.api_url + this.cpchapterurl + cpbookno)
            .pipe(map_1.map(function (data) { return data; }));
    };
    CpChapterServices.prototype.GetCpChapterByChapter = function (cpchapterno) {
        return this.http.get(this.appset.api_url + this.cpchapterurl1 + cpchapterno)
            .pipe(map_1.map(function (data) { return data; }));
    };
    CpChapterServices.prototype.GetCpContentsByChapter = function (cpchapterno) {
        return this.http.get(this.appset.api_url + this.cpcontentsurl + cpchapterno)
            .pipe(map_1.map(function (data) { return data; }));
    };
    CpChapterServices.prototype.GetTreeData = function (node) {
        switch (node.type) {
            case 'A':
                //大類
                return this.GetCpBookByBclass(node.cpbclass_no);
            case 'B':
                //書籍
                return this.GetCpChapterByBook(node.cpbook_no);
            case 'C':
                //章節
                if (!node.iscontents) {
                    return this.GetCpChapterByChapter(node.cpchapter_no);
                }
            case 'D':
                //章節或內容
                if (!node.iscontents) {
                    if (!node.iscontents) {
                        return this.GetCpChapterByChapter(node.cpchapter_no);
                    }
                }
                break;
        }
        //     return this.GetCpBookByBclass(node.cpbookno);
    };
    CpChapterServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet])
    ], CpChapterServices);
    return CpChapterServices;
}());
exports.CpChapterServices = CpChapterServices;
//# sourceMappingURL=CpChapter.Service.js.map