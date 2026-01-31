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
exports.MediaLinksServices = void 0;
var base_Services_1 = require("../module/base.Services");
var MediaLinksServices = /** @class */ (function (_super) {
    __extends(MediaLinksServices, _super);
    function MediaLinksServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaLinksServices.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        //find orignal data item
        var data1 = this.getData();
        var originalDataItem = data1.find(function (item) { return item.links_no === dataItem.links_no; });
    };
    return MediaLinksServices;
}(base_Services_1.baseServices));
exports.MediaLinksServices = MediaLinksServices;
//# sourceMappingURL=MediaLinks.Services.js.map