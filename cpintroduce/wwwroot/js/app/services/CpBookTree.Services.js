"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_Services_1 = require("../module/base.Services");
var CpBookTreeServices = /** @class */ (function (_super) {
    __extends(CpBookTreeServices, _super);
    function CpBookTreeServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclassurl = "cpbclass/getcpbclass";
        _this.booksorturl = "cpbook/getmaxbooksort";
        return _this;
    }
    CpBookTreeServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.cpook_no === dataItem.cpbook_no; });
    };
    CpBookTreeServices.prototype.GetBclassData = function (querystr) {
        if (querystr === void 0) { querystr = "ALL"; }
        return this.http.get(this.appset.api_url + this.bclassurl + "/" + querystr);
        //.map(response => reponse.json());
    };
    CpBookTreeServices.prototype.doQueryByParam = function (queryparam) {
        this.doQuery(queryparam.toString());
    };
    CpBookTreeServices.prototype.GetMaxBookSort = function () {
        return this.http.get(this.appset.api_url + this.booksorturl);
    };
    return CpBookTreeServices;
}(base_Services_1.baseServices));
exports.CpBookTreeServices = CpBookTreeServices;
//# sourceMappingURL=CpBookTree.Services.js.map