"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ExternalBase_Service_1 = require("./ExternalBase.Service");
var BclassExternalEditService = /** @class */ (function (_super) {
    __extends(BclassExternalEditService, _super);
    function BclassExternalEditService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BclassExternalEditService.prototype.preUpdateRow = function (data, alldata) {
        var pkey = data.bclass_no;
        this.oldItem = this.data.find(function (item) { return item.bclass_no == pkey; });
    };
    return BclassExternalEditService;
}(ExternalBase_Service_1.ExternalBaseService));
exports.BclassExternalEditService = BclassExternalEditService;
//# sourceMappingURL=bclassExternalEdit.Service.js.map