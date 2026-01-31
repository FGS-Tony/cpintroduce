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
exports.CpChapterTreeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CpChapterTree_Services_1 = require("../services/CpChapterTree.Services");
var BasePopupEdit_Component_1 = require("../module/BasePopupEdit.Component");
var CpChapterTreeComponent = /** @class */ (function (_super) {
    __extends(CpChapterTreeComponent, _super);
    function CpChapterTreeComponent(CpChapterTreeServiceFactory) {
        var _this = _super.call(this, CpChapterTreeServiceFactory) || this;
        _this.CpChapterTreeServiceFactory = CpChapterTreeServiceFactory;
        //public cpbclass: any[];
        _this.cpbookno = 0;
        _this.cpchapterupper = 0;
        _this.opened = false;
        _this.opened1 = false;
        _this.hostUpload = "/api/image/UploadImage";
        _this.uploadFolder = "images";
        _this.contents = " ";
        _this.isSubmit = false;
        _this.save = new core_1.EventEmitter();
        _this.editService.saveUrl = "cpchapter";
        _this.editService.queryUrl = "cpchapter/getcpchapterbybook";
        return _this;
    }
    CpChapterTreeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    Object.defineProperty(CpChapterTreeComponent.prototype, "bookno", {
        set: function (cpbookno) {
            this.editService.queryUrl = "cpchapter/getcpchapterbybook";
            this.CpChapterTreeServiceFactory.doQueryByBookParam(cpbookno);
            if (cpbookno > 0) {
                this.cpbookno = cpbookno;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpChapterTreeComponent.prototype, "chapterno", {
        set: function (chapterno) {
            this.editService.queryUrl = "cpchapter/getcpchapterbychapter";
            this.CpChapterTreeServiceFactory.doQueryByBookParam(chapterno);
            if (chapterno > 0) {
                this.cpchapterupper = chapterno;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpChapterTreeComponent.prototype, "setbookno", {
        set: function (cpbookno) {
            if (cpbookno > 0) {
                this.cpbookno = cpbookno;
            }
        },
        enumerable: false,
        configurable: true
    });
    CpChapterTreeComponent.prototype.preaddHandler = function (_a) {
        var _this = this;
        var sender = _a.sender;
        this.formGroup = new forms_1.FormGroup({
            'cpbook_no': new forms_1.FormControl(this.cpbookno),
            'cpchapter_no': new forms_1.FormControl(0),
            'cpchapter_sort': new forms_1.FormControl(0),
            'cpchapter_upper': new forms_1.FormControl(this.cpchapterupper),
            'cpchapter_iscontents': new forms_1.FormControl(false),
            'cpchapter_name': new forms_1.FormControl(""),
            'cpchapter_isvalid': new forms_1.FormControl(true),
            'cpchapter_contents': new forms_1.FormControl(" ")
        });
        this.CpChapterTreeServiceFactory.GetMaxCpchapterSort().subscribe(function (data) {
            _this.maxSort = data.maxsort;
            _this.formGroup.controls["cpchapter_sort"].setValue(_this.maxSort);
        });
        this.opened = true;
    };
    CpChapterTreeComponent.prototype.preeditHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        if (dataItem.cpchapter_contents == "" || dataItem.cpchapter_contents == null) {
            dataItem.cpchapter_contents = " ";
        }
        this.formGroup = new forms_1.FormGroup({
            'cpbook_no': new forms_1.FormControl(dataItem.cpbook_no),
            'cpchapter_no': new forms_1.FormControl(dataItem.cpchapter_no),
            'cpchapter_upper': new forms_1.FormControl(dataItem.cpchapter_upper),
            'cpchapter_iscontents': new forms_1.FormControl(dataItem.cpchapter_iscontents),
            'cpchapter_sort': new forms_1.FormControl(dataItem.cpchapter_sort),
            'cpchapter_name': new forms_1.FormControl(dataItem.cpchapter_name),
            'cpchapter_isvalid': new forms_1.FormControl(dataItem.cpchapter_isvalid),
            'cpchapter_contents': new forms_1.FormControl(dataItem.cpchapter_contents)
        });
        this.opened = true;
    };
    CpChapterTreeComponent.prototype.editContents = function (dataItem) {
        this.opened = true;
    };
    CpChapterTreeComponent.prototype.close = function (isnew) {
        //  console.log(this.cancelbtn);
        //  this.cancelbtn.nativeElement.click();
        this.opened = false;
        this.opened1 = false;
    };
    CpChapterTreeComponent.prototype.close1 = function () {
        this.opened1 = false;
    };
    CpChapterTreeComponent.prototype.preview = function () {
        this.opened1 = true;
    };
    CpChapterTreeComponent.prototype.submit = function () {
        var _this = this;
        //   console.log(this.formGroup.value)
        //   this.savebtn.nativeElement.click();
        this.isSubmit = true;
        this.saveHandler(this.formGroup.value);
        this.save.emit(this.formGroup.value);
        this.opened = false;
        setTimeout(function () {
            _this.isSubmit = false;
        }, 1000);
    };
    __decorate([
        (0, core_1.ViewChild)("savebtn"),
        __metadata("design:type", core_1.ElementRef)
    ], CpChapterTreeComponent.prototype, "savebtn", void 0);
    __decorate([
        (0, core_1.ViewChild)("cancelbtn"),
        __metadata("design:type", core_1.ElementRef)
    ], CpChapterTreeComponent.prototype, "cancelbtn", void 0);
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CpChapterTreeComponent.prototype, "bookno", null);
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CpChapterTreeComponent.prototype, "chapterno", null);
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", String)
    ], CpChapterTreeComponent.prototype, "cpchapter_upname", void 0);
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CpChapterTreeComponent.prototype, "setbookno", null);
    __decorate([
        (0, core_1.Output)(),
        __metadata("design:type", core_1.EventEmitter)
    ], CpChapterTreeComponent.prototype, "save", void 0);
    CpChapterTreeComponent = __decorate([
        (0, core_1.Component)({
            selector: 'cp-chaptertree',
            templateUrl: 'cppages/CpChapterTreeComponent'
        }),
        __metadata("design:paramtypes", [CpChapterTree_Services_1.CpChapterTreeServices])
    ], CpChapterTreeComponent);
    return CpChapterTreeComponent;
}(BasePopupEdit_Component_1.BasePopupEditComponent));
exports.CpChapterTreeComponent = CpChapterTreeComponent;
//# sourceMappingURL=cpchaptertree.component.js.map