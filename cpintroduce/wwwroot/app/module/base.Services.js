"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseServices = void 0;
var core_1 = require("@angular/core");
//import { Http, Headers, RequestOptions } from '@angular/http';
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var appset_1 = require("../provider/appset");
var primeng_1 = require("primeng/primeng");
var http_1 = require("@angular/common/http");
var tap_1 = require("rxjs/operators/tap");
var CREATE_ACTION = 'create';
var UPDATE_ACTION = 'update';
var REMOVE_ACTION = 'delete';
var baseServices = /** @class */ (function (_super) {
    __extends(baseServices, _super);
    function baseServices(http, appset, confirmservice) {
        var _this = _super.call(this, []) || this;
        _this.http = http;
        _this.appset = appset;
        _this.confirmservice = confirmservice;
        _this.data = [];
        _this.busya = new BehaviorSubject_1.BehaviorSubject([]);
        return _this;
    }
    baseServices.prototype.setOldItem = function (item) {
        this.oldItem = item;
    };
    baseServices.prototype.read = function () {
        var _this = this;
        this.busya.next(["busy"]);
        if (this.data.length) {
            _super.prototype.next.call(this, this.data);
            this.busya.next([]);
        }
        else {
            this.fetch()
                .pipe((0, tap_1.tap)(function (data) {
                _this.data = data;
            }))
                .subscribe(function (data) {
                _super.prototype.next.call(_this, data);
                _this.busya.next([]);
            }, function (error) { _this.busya.next([]); console.log(error); });
        }
    };
    baseServices.prototype.fetch = function (querystr) {
        if (querystr === void 0) { querystr = "ALL"; }
        this.busya.next(["busy"]);
        this.reset();
        return this.http.get(this.appset.api_url + this.queryurl + "/" + querystr);
        //.map(response => reponse.json());
    };
    baseServices.prototype.doQuery = function (querystring) {
        var _this = this;
        if (querystring === void 0) { querystring = "ALL"; }
        this.busya.next(["busy"]);
        if (querystring == "") {
            querystring = "ALL";
        }
        this.reset();
        this.fetch(querystring)
            .pipe((0, tap_1.tap)(function (data) {
            _this.data = data;
        }))
            .subscribe(function (data) {
            _super.prototype.next.call(_this, data);
            _this.busya.next([]);
        }, function (error) { _this.busya.next([]); console.log(error); });
    };
    baseServices.prototype.savedata = function (action, data) {
        if (action === void 0) { action = ""; }
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.appset.api_url + this.saveurl + "/" + action, data, { headers: headers });
    };
    baseServices.prototype.save = function (data, isNew) {
        var _this = this;
        this.busya.next(["busy"]);
        var action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.savedata(action, data)
            .subscribe(function (sdata) {
            if (isNew) {
                var tempdata = __spreadArray([], _this.data, true);
                _this.data = [];
                tempdata.push(sdata);
                _this.data = __spreadArray([], tempdata, true);
                _super.prototype.next.call(_this, _this.data);
            }
            else {
                var index = _this.findSelecteIndex(_this.oldItem);
                var tempdata = __spreadArray([], _this.data, true);
                _this.data = [];
                tempdata.splice(index, 1, data);
                _this.data = __spreadArray([], tempdata, true);
                _super.prototype.next.call(_this, _this.data);
            }
            _this.busya.next([]);
            _this.appset.sayAlert("存檔成功");
        }, function (ERROR) { _this.busya.next([]); _this.appset.sayAlert("存檔失敗"); });
    };
    baseServices.prototype.remove = function (data) {
        var _this = this;
        this.confirmservice.confirm({
            message: '是否確認刪除資料?',
            accept: function () {
                _this.removedata(data).subscribe(function (SUCCESS) {
                    _this.appset.sayAlert("刪除成功");
                }, function (ERROR) {
                    _this.appset.sayAlert("刪除失敗");
                });
            },
            reject: function () { console.log("cance"); }
        });
    };
    baseServices.prototype.removedata = function (data) {
        //  this.reset();
        var index = this.findSelecteIndex(data);
        var tempdata = __spreadArray([], this.data, true);
        this.data = [];
        tempdata.splice(index, 1);
        this.data = __spreadArray([], tempdata, true);
        _super.prototype.next.call(this, this.data);
        return this.savedata(REMOVE_ACTION, data);
    };
    baseServices.prototype.resetItem = function (dataItem) {
        //if (!dataItem) { return; }
        ////find orignal data item
        //const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);
    };
    baseServices.prototype.reset = function () {
        this.data = [];
    };
    baseServices.prototype.getData = function () {
        return this.data;
    };
    Object.defineProperty(baseServices.prototype, "saveUrl", {
        set: function (url) {
            this.saveurl = url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(baseServices.prototype, "queryUrl", {
        set: function (url) {
            this.queryurl = url;
        },
        enumerable: false,
        configurable: true
    });
    baseServices.prototype.findSelecteIndex = function (data) {
        return this.data.indexOf(data);
    };
    baseServices = __decorate([
        (0, core_1.Injectable)(),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet, primeng_1.ConfirmationService])
    ], baseServices);
    return baseServices;
}(BehaviorSubject_1.BehaviorSubject));
exports.baseServices = baseServices;
//# sourceMappingURL=base.Services.js.map