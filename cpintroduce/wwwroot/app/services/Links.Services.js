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
exports.LinksServices = void 0;
var base_Services_1 = require("../module/base.Services");
var LinksServices = /** @class */ (function (_super) {
    __extends(LinksServices, _super);
    function LinksServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinksServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.links_no === dataItem.links_no; });
    };
    return LinksServices;
}(base_Services_1.baseServices));
exports.LinksServices = LinksServices;
//# sourceMappingURL=Links.Services.js.map