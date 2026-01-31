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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CpBookTree_Services_1 = require("../services/CpBookTree.Services");
var Base_Component_1 = require("../module/Base.Component");
var CpBookTreeComponent = /** @class */ (function (_super) {
    __extends(CpBookTreeComponent, _super);
    function CpBookTreeComponent(BookTreeServiceFactory) {
        var _this = _super.call(this, BookTreeServiceFactory) || this;
        _this.BookTreeServiceFactory = BookTreeServiceFactory;
        _this.save = new core_1.EventEmitter();
        _this.editService.saveUrl = "cpbook";
        _this.editService.queryUrl = "cpbook/getcpbookbybclassa";
        return _this;
    }
    CpBookTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.cpbclass = [];
        this.BookTreeServiceFactory.GetBclassData().subscribe(function (data) {
            _this.cpbclass = data;
        }, function (error) { return console.log(error); });
    };
    Object.defineProperty(CpBookTreeComponent.prototype, "bclassno", {
        set: function (cpbclassno) {
            this.BookTreeServiceFactory.doQueryByParam(cpbclassno);
            if (cpbclassno > 0) {
                this.cpbclassno = cpbclassno;
                //this.cpbclass = [];
                //this.BookServiceFactory.GetBclassData().subscribe(
                //    (data: any) => {
                //        this.cpbclass = data;
                //    },
                //    (error) => console.log(error)
                //);
            }
        },
        enumerable: true,
        configurable: true
    });
    CpBookTreeComponent.prototype.preaddHandler = function (_a) {
        var _this = this;
        var sender = _a.sender;
        this.formGroup = new forms_1.FormGroup({
            'cpbclass_no': new forms_1.FormControl(this.cpbclassno),
            'cpbook_no': new forms_1.FormControl(0),
            'cpbook_name': new forms_1.FormControl("", forms_1.Validators.required),
            'cpbook_sort': new forms_1.FormControl(0, forms_1.Validators.required),
            'cpbook_isvalid': new forms_1.FormControl(true),
            'cpbook_isdisplay': new forms_1.FormControl(true, forms_1.Validators.required)
        });
        this.BookTreeServiceFactory.GetMaxBookSort().subscribe(function (data) {
            _this.maxSort = data.maxsort;
            _this.formGroup.controls["cpbook_sort"].setValue(_this.maxSort);
        }, function (error) {
            console.log(error);
        });
    };
    CpBookTreeComponent.prototype.preeditHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.formGroup = new forms_1.FormGroup({
            'cpbclass_no': new forms_1.FormControl(dataItem.cpbclass_no),
            'cpbook_no': new forms_1.FormControl(dataItem.cpbook_no),
            'cpbook_name': new forms_1.FormControl(dataItem.cpbook_name, forms_1.Validators.required),
            'cpbook_sort': new forms_1.FormControl(dataItem.cpbook_sort, forms_1.Validators.required),
            'cpbook_isvalid': new forms_1.FormControl(dataItem.cpbook_isvalid),
            'cpbook_isdisplay': new forms_1.FormControl(dataItem.cpbook_isdisplay, forms_1.Validators.required)
        });
    };
    CpBookTreeComponent.prototype.getcpbclassname = function (cpbclassno) {
        return this.cpbclass.find(function (x) { return x.cpbclass_no == cpbclassno; });
    };
    CpBookTreeComponent.prototype.possaveHandler = function (sender, rowIndex, formGroup, isNew) {
        this.save.emit(formGroup);
    };
    CpBookTreeComponent.prototype.posremoveHandler = function (dataitme) {
        this.save.emit(dataitme);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CpBookTreeComponent.prototype, "bclassno", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CpBookTreeComponent.prototype, "save", void 0);
    CpBookTreeComponent = __decorate([
        core_1.Component({
            selector: 'cp-booktree',
            templateUrl: 'cppages/CpBooktreecomponent'
        }),
        __metadata("design:paramtypes", [CpBookTree_Services_1.CpBookTreeServices])
    ], CpBookTreeComponent);
    return CpBookTreeComponent;
}(Base_Component_1.BaseComponent));
exports.CpBookTreeComponent = CpBookTreeComponent;
//# sourceMappingURL=cpbooktree.component.js.map