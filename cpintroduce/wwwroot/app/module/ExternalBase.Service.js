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
exports.ExternalBaseService = void 0;
var core_1 = require("@angular/core");
//import { Http, Headers, RequestOptions } from '@angular/http';
var http_1 = require("@angular/common/http");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var appset_1 = require("../provider/appset");
var CREATE_ACTION = 'create';
var UPDATE_ACTION = 'update';
var REMOVE_ACTION = 'delete';
var tap_1 = require("rxjs/operators/tap");
var ExternalBaseService = /** @class */ (function (_super) {
    __extends(ExternalBaseService, _super);
    function ExternalBaseService(http, appset) {
        var _this = _super.call(this, []) || this;
        _this.http = http;
        _this.appset = appset;
        _this.data = [];
        _this.busya = new BehaviorSubject_1.BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(ExternalBaseService.prototype, "queryParm", {
        get: function () {
            return this.queryparm;
        },
        set: function (queryvalue) {
            this.queryparm = queryvalue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExternalBaseService.prototype, "queryUrl", {
        set: function (queryurl) {
            this.queryurl = queryurl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExternalBaseService.prototype, "saveUrl", {
        set: function (saveurl) {
            this.saveurl = saveurl;
        },
        enumerable: false,
        configurable: true
    });
    ExternalBaseService.prototype.setOldItem = function (item) {
        this.oldItem = item;
    };
    ExternalBaseService.prototype.read = function () {
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
            });
        }
    };
    ExternalBaseService.prototype.fetch = function () {
        this.busya.next(["busy"]);
        this.reset();
        //     this.queryparm = `${queryname}/${queryact}/${querysdate.toISOString()}/${queryedate.toISOString()}/${querylocation}`;
        return this.http.get(this.appset.api_url + this.queryurl + "/" + this.queryparm);
    };
    ExternalBaseService.prototype.doQuery = function () {
        var _this = this;
        console.log("doquery");
        this.busya.next(["busy"]);
        this.reset();
        this.fetch()
            .pipe((0, tap_1.tap)(function (data) {
            _this.data = data;
        }))
            .subscribe(function (data) {
            _super.prototype.next.call(_this, data);
            _this.busya.next([]);
        }, function (error) { _this.busya.next([]); console.log(error); });
    };
    ExternalBaseService.prototype.savedata = function (action, data) {
        if (action === void 0) { action = ""; }
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });         
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.appset.api_url + this.saveurl + "/" + action, data, { headers: headers });
    };
    ExternalBaseService.prototype.save = function (data, isNew) {
        var action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        //    this.reset();       
        return this.savedata(action, data);
    };
    ExternalBaseService.prototype.remove = function (data) {
        //  this.reset();
        var index = this.findSelecteIndex(data);
        var tempdata = __spreadArray([], this.data, true);
        this.data = [];
        tempdata.splice(index, 1);
        this.data = __spreadArray([], tempdata, true);
        _super.prototype.next.call(this, this.data);
        return this.savedata(REMOVE_ACTION, data);
    };
    ExternalBaseService.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var originalDataItem = this.data.find(function (item) { return item.images_no == dataItem.images_no; });
    };
    ExternalBaseService.prototype.reset = function () {
        //    this.data.find(item => item.images_isactive == true);
        this.data = [];
    };
    ExternalBaseService.prototype.addRow = function (data) {
        var tempdata = __spreadArray([], this.data, true);
        this.data = [];
        tempdata.push(data);
        this.data = __spreadArray([], tempdata, true);
        _super.prototype.next.call(this, this.data);
    };
    ExternalBaseService.prototype.updateRow = function (data) {
        this.preUpdateRow(data, this.data);
        var index = this.findSelecteIndex(this.oldItem);
        var tempdata = __spreadArray([], this.data, true);
        this.data = [];
        tempdata.splice(index, 1, data);
        //     tempdata.push(JSON.parse(data));
        this.data = __spreadArray([], tempdata, true);
        _super.prototype.next.call(this, this.data);
    };
    ExternalBaseService.prototype.findSelecteIndex = function (data) {
        return this.data.indexOf(data);
    };
    ExternalBaseService.prototype.preUpdateRow = function (data, alldata) {
    };
    ExternalBaseService.prototype.getCount = function () {
        return this.data.length;
    };
    ExternalBaseService = __decorate([
        (0, core_1.Injectable)(),
        __metadata("design:paramtypes", [http_1.HttpClient, appset_1.AppSet])
    ], ExternalBaseService);
    return ExternalBaseService;
}(BehaviorSubject_1.BehaviorSubject));
exports.ExternalBaseService = ExternalBaseService;
//# sourceMappingURL=ExternalBase.Service.js.map