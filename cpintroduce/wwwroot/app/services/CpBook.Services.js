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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpBookServices = void 0;
var base_Services_1 = require("../module/base.Services");
var CpBookServices = /** @class */ (function (_super) {
    __extends(CpBookServices, _super);
    function CpBookServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclassurl = "cpbclass/getcpbclass";
        _this.booksorturl = "cpbook/getmaxbooksort";
        return _this;
    }
    CpBookServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.cpook_no === dataItem.cpbook_no; });
    };
    CpBookServices.prototype.GetBclassData = function (querystr) {
        if (querystr === void 0) { querystr = "ALL"; }
        return this.http.get(this.appset.api_url + this.bclassurl + "/" + querystr);
        //.map(response => reponse.json());
    };
    CpBookServices.prototype.GetMaxBookSort = function () {
        return this.http.get(this.appset.api_url + this.booksorturl);
    };
    return CpBookServices;
}(base_Services_1.baseServices));
exports.CpBookServices = CpBookServices;
//# sourceMappingURL=CpBook.Services.js.map