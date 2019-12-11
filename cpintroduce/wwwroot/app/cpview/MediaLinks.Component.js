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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MediaLinks_Services_1 = require("../services/MediaLinks.Services");
var Base_Component_1 = require("../module/Base.Component");
var MediaLinksComponent = /** @class */ (function (_super) {
    __extends(MediaLinksComponent, _super);
    function MediaLinksComponent(MediaLinksServicesFactory) {
        var _this = _super.call(this, MediaLinksServicesFactory) || this;
        _this.MediaLinksServicesFactory = MediaLinksServicesFactory;
        _this.editService.saveUrl = "links";
        _this.editService.queryUrl = "links/getmedialinks";
        return _this;
        //     this.editService = baseServiceFactory;
    }
    MediaLinksComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        setTimeout(function () {
            _this.editService.read();
        }, 1000);
    };
    MediaLinksComponent.prototype.preaddHandler = function (_a) {
        var sender = _a.sender;
        this.formGroup = new forms_1.FormGroup({
            'links_no': new forms_1.FormControl(0),
            'links_url': new forms_1.FormControl("", forms_1.Validators.required),
            'links_name': new forms_1.FormControl("", forms_1.Validators.required),
            'links_sort': new forms_1.FormControl(0, forms_1.Validators.required),
            'links_isdisplay': new forms_1.FormControl(true, forms_1.Validators.required),
            'links_isvalid': new forms_1.FormControl(true, forms_1.Validators.required),
            'links_type': new forms_1.FormControl(2)
        });
    };
    MediaLinksComponent.prototype.preeditHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.formGroup = new forms_1.FormGroup({
            'links_no': new forms_1.FormControl(dataItem.links_no),
            'links_url': new forms_1.FormControl(dataItem.links_url, forms_1.Validators.required),
            'links_name': new forms_1.FormControl(dataItem.links_name, forms_1.Validators.required),
            'links_sort': new forms_1.FormControl(dataItem.links_sort, forms_1.Validators.required),
            'links_isdisplay': new forms_1.FormControl(dataItem.links_isdisplay, forms_1.Validators.required),
            'links_isvalid': new forms_1.FormControl(dataItem.links_isvalid, forms_1.Validators.required),
            'links_type': new forms_1.FormControl(dataItem.links_type)
        });
    };
    MediaLinksComponent = __decorate([
        core_1.Component({
            selector: 'cp-medialinks',
            templateUrl: 'cppages/MediaLinksComponent'
        }),
        __metadata("design:paramtypes", [MediaLinks_Services_1.MediaLinksServices])
    ], MediaLinksComponent);
    return MediaLinksComponent;
}(Base_Component_1.BaseComponent));
exports.MediaLinksComponent = MediaLinksComponent;
//# sourceMappingURL=MediaLinks.Component.js.map