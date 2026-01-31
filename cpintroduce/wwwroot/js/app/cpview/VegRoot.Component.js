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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var externalBase_Component_1 = require("../module/externalBase.Component");
var appset_1 = require("../provider/appset");
var primeng_1 = require("primeng/primeng");
var vegroot_1 = require("../provider/vegroot");
var VegRootEdit_Services_1 = require("../services/VegRootEdit.Services");
var messageservice_1 = require("primeng/components/common/messageservice");
var VegRootComponent = /** @class */ (function (_super) {
    __extends(VegRootComponent, _super);
    function VegRootComponent(vegrooteditservice, appset, confirmationservice, messageService) {
        var _this = _super.call(this, vegrooteditservice, appset, confirmationservice) || this;
        _this.confirmationservice = confirmationservice;
        _this.messageService = messageService;
        _this.queryString = "ALL";
        _this.queryName = "";
        _this.editService = vegrooteditservice;
        _this.editService.saveUrl = "vegroot";
        _this.editService.queryUrl = "/vegroot/getvegroot";
        _this.editService.queryparm = "" + _this.queryString;
        return _this;
    }
    VegRootComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        /*this.appset.setisLoading(true);*/
        this.editService.read();
    };
    VegRootComponent.prototype.preaddHandler = function () {
        this.editDataItem = new vegroot_1.VegRoot();
        this.editDataItem.vegroot_no = 0;
        this.editDataItem.vergoot_sort = 0;
        this.editDataItem.vergoot_volume = 0;
        this.editDataItem.vegroot_isvalid = true;
        this.editDataItem.ctime = new Date();
    };
    VegRootComponent.prototype.doQuery = function () {
        this.queryString = this.queryName == "" ? "ALL" : this.queryName;
        this.editService.queryparm = "" + this.queryString;
        this.editService.doQuery();
    };
    VegRootComponent = __decorate([
        core_1.Component({
            selector: 'veg-root',
            templateUrl: '/cppages/VegRootComponent'
        }),
        __param(0, core_1.Inject(VegRootEdit_Services_1.VegrootEditService)),
        __metadata("design:paramtypes", [Object, appset_1.AppSet, primeng_1.ConfirmationService, messageservice_1.MessageService])
    ], VegRootComponent);
    return VegRootComponent;
}(externalBase_Component_1.ExternalBaseComponent));
exports.VegRootComponent = VegRootComponent;
//# sourceMappingURL=VegRoot.Component.js.map