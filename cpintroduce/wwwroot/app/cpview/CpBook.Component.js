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
exports.CpBookComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CpBook_Services_1 = require("../services/CpBook.Services");
var Base_Component_1 = require("../module/Base.Component");
var CpBookComponent = /** @class */ (function (_super) {
    __extends(CpBookComponent, _super);
    function CpBookComponent(BookServiceFactory) {
        var _this = _super.call(this, BookServiceFactory) || this;
        _this.BookServiceFactory = BookServiceFactory;
        _this.editService.saveUrl = "cpbook";
        _this.editService.queryUrl = "cpbook/getcpbook";
        return _this;
    }
    CpBookComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.cpbclass = [];
        setTimeout(function () {
            _this.BookServiceFactory.GetBclassData().subscribe(function (data) {
                _this.cpbclass = data;
                var bclassno = 1;
                var querystr = "ALL";
                var queryparm = "".concat(bclassno.toString(), "/").concat(querystr);
                _this.BookServiceFactory.doQuery(queryparm);
                //this.BookServiceFactory.read();
            }, function (error) { return console.log(error); });
        }, 1000);
    };
    CpBookComponent.prototype.preaddHandler = function (_a) {
        var _this = this;
        var sender = _a.sender;
        this.setNewFormData(0);
        this.BookServiceFactory.GetMaxBookSort().subscribe(function (data) {
            _this.maxSort = data.maxsort;
            _this.formGroup.controls["cpbook_sort"].setValue(_this.maxSort);
        }, function (error) {
            console.log(error);
        });
    };
    CpBookComponent.prototype.preeditHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.formGroup = new forms_1.FormGroup({
            'cpbclass_no': new forms_1.FormControl(dataItem.cpbclass_no, forms_1.Validators.required),
            'cpbook_no': new forms_1.FormControl(dataItem.cpbook_no),
            'cpbook_name': new forms_1.FormControl(dataItem.cpbook_name, forms_1.Validators.required),
            'cpbook_isdisplay': new forms_1.FormControl(dataItem.cpbook_isdisplay, forms_1.Validators.required),
            'cpbook_sort': new forms_1.FormControl(dataItem.cpbook_sort, forms_1.Validators.required),
            'cpbook_isvalid': new forms_1.FormControl(dataItem.cpbook_isvalid, forms_1.Validators.required)
        });
    };
    CpBookComponent.prototype.getcpbclassname = function (cpbclassno) {
        return this.cpbclass.find(function (x) { return x.cpbclass_no == cpbclassno; });
    };
    CpBookComponent.prototype.setNewFormData = function (maxsort) {
        this.formGroup = new forms_1.FormGroup({
            'cpbclass_no': new forms_1.FormControl(null, forms_1.Validators.required),
            'cpbook_no': new forms_1.FormControl(0),
            'cpbook_name': new forms_1.FormControl("", forms_1.Validators.required),
            'cpbook_sort': new forms_1.FormControl(maxsort, forms_1.Validators.required),
            'cpbook_isvalid': new forms_1.FormControl(true, forms_1.Validators.required),
            'cpbook_isdisplay': new forms_1.FormControl(true, forms_1.Validators.required)
        });
    };
    CpBookComponent.prototype.doExecQuery = function () {
        var queryname1;
        if (this.queryname == "" || this.queryname == null) {
            queryname1 = "ALL";
        }
        else {
            queryname1 = this.queryname;
        }
        var queryparm = "".concat(this.cpbclass_no, "/").concat(queryname1);
        this.BookServiceFactory.doQuery(queryparm);
    };
    CpBookComponent = __decorate([
        (0, core_1.Component)({
            selector: 'cp-book',
            templateUrl: 'cppages/CpBookComponent'
        }),
        __metadata("design:paramtypes", [CpBook_Services_1.CpBookServices])
    ], CpBookComponent);
    return CpBookComponent;
}(Base_Component_1.BaseComponent));
exports.CpBookComponent = CpBookComponent;
//# sourceMappingURL=CpBook.Component.js.map