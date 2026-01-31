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
exports.CpChapterTreeServices = void 0;
var basePopupEdit_Services_1 = require("../module/basePopupEdit.Services");
var CpChapterTreeServices = /** @class */ (function (_super) {
    __extends(CpChapterTreeServices, _super);
    function CpChapterTreeServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclassurl = "cpchapter/getcpchapter";
        _this.maxsorturl = "cpchapter/getmaxcpchaptersort";
        return _this;
    }
    CpChapterTreeServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.cpchapter_no === dataItem.cpchapter_no; });
    };
    CpChapterTreeServices.prototype.GetBclassData = function (querystr) {
        if (querystr === void 0) { querystr = "ALL"; }
        return this.http.get(this.appset.api_url + this.bclassurl + "/" + querystr);
        //.map(response => reponse.json());
    };
    CpChapterTreeServices.prototype.doQueryByBookParam = function (queryparam) {
        this.doQuery(queryparam.toString());
    };
    CpChapterTreeServices.prototype.GetMaxCpchapterSort = function () {
        return this.http.get(this.appset.api_url + this.maxsorturl);
    };
    return CpChapterTreeServices;
}(basePopupEdit_Services_1.basePopupEditServices));
exports.CpChapterTreeServices = CpChapterTreeServices;
//# sourceMappingURL=CpChapterTree.Services.js.map