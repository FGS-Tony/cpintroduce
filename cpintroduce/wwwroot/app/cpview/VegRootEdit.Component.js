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
var externalEditBase_Component_1 = require("../module/externalEditBase.Component");
var VegRootEdit_Services_1 = require("../services/VegRootEdit.Services");
var messageservice_1 = require("primeng/components/common/messageservice");
var appset_1 = require("../provider/appset");
var forms_1 = require("@angular/forms");
var VegRootEditComponent = /** @class */ (function (_super) {
    __extends(VegRootEditComponent, _super);
    function VegRootEditComponent(_fb, messageService, vegrootservice, appset) {
        var _this = _super.call(this, _fb) || this;
        _this._fb = _fb;
        _this.messageService = messageService;
        _this.vegrootservice = vegrootservice;
        _this.appset = appset;
        _this.editForm = _this._fb.group({
            'vegroot_no': [0],
            'vegroot_volume': [0, forms_1.Validators.required],
            'vegroot_seq': [0],
            'vegroot_content': ["", forms_1.Validators.required],
            'vegroot_isvalid': [true],
            'ctime': [new Date()],
            'etime': [new Date()],
            'cuser': [""],
            'euser': [""]
        });
        return _this;
    }
    VegRootEditComponent = __decorate([
        core_1.Component({
            selector: 'vegroot-edit-form',
            styles: ['input[type=text] { width: 80%; max-width:800px} .k-switch-label-off, .k-switch-label-on{ color: red }'],
            templateUrl: '/cppages/vegrooteditcomponent'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, messageservice_1.MessageService,
            VegRootEdit_Services_1.VegrootEditService, appset_1.AppSet])
    ], VegRootEditComponent);
    return VegRootEditComponent;
}(externalEditBase_Component_1.externalEditBaseComponent));
exports.VegRootEditComponent = VegRootEditComponent;
//# sourceMappingURL=VegRootEdit.Component.js.map