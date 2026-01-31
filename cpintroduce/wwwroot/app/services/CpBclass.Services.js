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
exports.CpBclassServices = void 0;
var base_Services_1 = require("../module/base.Services");
var CpBclassServices = /** @class */ (function (_super) {
    __extends(CpBclassServices, _super);
    function CpBclassServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclasssorturl = "cpbclass/getmaxbclasssort";
        return _this;
    }
    CpBclassServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.cpbclass_no === dataItem.cpbclass_no; });
    };
    CpBclassServices.prototype.GetMaxBclassSort = function () {
        return this.http.get(this.appset.api_url + this.bclasssorturl);
    };
    return CpBclassServices;
}(base_Services_1.baseServices));
exports.CpBclassServices = CpBclassServices;
//# sourceMappingURL=CpBclass.Services.js.map