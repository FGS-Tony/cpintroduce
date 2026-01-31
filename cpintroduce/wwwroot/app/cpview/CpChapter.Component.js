"use strict";
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
exports.CpChapterComponent = void 0;
var core_1 = require("@angular/core");
var CpChapter_Service_1 = require("../services/CpChapter.Service");
var kendo_angular_treeview_1 = require("@progress/kendo-angular-treeview");
var CpChapterComponent = /** @class */ (function () {
    function CpChapterComponent(cpchapterservices) {
        var _this = this;
        this.cpchapterservices = cpchapterservices;
        this.cpbclassno = 0;
        this.cpbookno = 0;
        this.cpchapterno = 0;
        this.cpchapter_iscontents = false;
        this.fetchChildren = function (item) { return _this.cpchapterservices.GetTreeData(item); };
    }
    CpChapterComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.cpchapterservices.GetCpBclass().subscribe(function (data) { _this.cpbclass = data; }, function (error) { return console.log(error); });
        }, 1000);
    };
    CpChapterComponent.prototype.hasChildren = function (item) {
        return true;
    };
    CpChapterComponent.prototype.selectChange = function (node) {
        this.currentnode = node;
        switch (node.dataItem.type) {
            case 'A':
                this.cptype = "A";
                this.cpbclassno = node.dataItem.cpbclass_no;
                break;
            case 'B':
                this.cptype = "B";
                this.cpbookno = node.dataItem.cpbook_no;
                this.cpbookname = node.dataItem.cpbook_name;
                break;
            case 'C':
                this.cptype = "C";
                this.cpchapterno = node.dataItem.cpchapter_no;
                this.cpbookno = node.dataItem.cpbook_no;
                this.cpchapter_contents = node.dataItem.cpchapter_contents;
                this.cpchapter_name = node.dataItem.cpchapter_name;
                this.cpchapter_sort = node.dataItem.cpchapter_sort;
                this.cpchapter_iscontents = node.dataItem.cpchapter_iscontents;
                break;
        }
    };
    CpChapterComponent.prototype.expand = function (node) {
        this.currentnode = node;
        this.selectChange(node);
    };
    CpChapterComponent.prototype.saveHandler = function () {
        var _this = this;
        this.CTreeview.focus(this.currentnode.index);
        this.CTreeview.collapse.emit(this.currentnode);
        setTimeout(function () {
            _this.CTreeview.expand.emit(_this.currentnode);
        }, 500);
        // this.collaspe.emit(this.currentnode);
        this.cpchapterservices.GetTreeData(this.currentnode);
        //    this.expand(this.currentnode);
    };
    __decorate([
        (0, core_1.ViewChild)("chaptertreeview"),
        __metadata("design:type", kendo_angular_treeview_1.TreeViewComponent)
    ], CpChapterComponent.prototype, "CTreeview", void 0);
    CpChapterComponent = __decorate([
        (0, core_1.Component)({
            selector: 'cp-chapter',
            templateUrl: 'cppages/CpChapterComponent'
        }),
        __metadata("design:paramtypes", [CpChapter_Service_1.CpChapterServices])
    ], CpChapterComponent);
    return CpChapterComponent;
}());
exports.CpChapterComponent = CpChapterComponent;
//# sourceMappingURL=CpChapter.Component.js.map