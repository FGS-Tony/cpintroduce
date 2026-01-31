"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_data_query_1 = require("@progress/kendo-data-query");
var map_1 = require("rxjs/operators/map");
//import { tap } from 'rxjs/operators/tap';
var BasePopupEditComponent = /** @class */ (function () {
    function BasePopupEditComponent(baseServiceFactory) {
        this.busy = [];
        this.querystring = "";
        this.gridState = {
            sort: [],
            skip: 0,
            take: 10
        };
        this.currentRow = 0;
        this.editService = baseServiceFactory;
    }
    BasePopupEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editService.busya.subscribe(function (data) {
            _this.busy = data;
        });
        this.view = this.editService.pipe(map_1.map(function (data) { return kendo_data_query_1.process(data, _this.gridState); }));
    };
    BasePopupEditComponent.prototype.doQuery = function () {
        this.editService.doQuery(this.querystring);
    };
    BasePopupEditComponent.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.editService.read();
    };
    BasePopupEditComponent.prototype.addHandler = function (_a) {
        var sender = _a.sender;
        var rowIndex = undefined;
        //   this.closeEditor({ sender, rowIndex });
        this.preaddHandler(sender);
        //sender.addRow(this.formGroup);
        this.currentItem = undefined;
        this.isNew = true;
    };
    BasePopupEditComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        //     this.closeEditor({ sender, rowIndex });
        this.editService.setOldItem(dataItem);
        this.preeditHandler({ sender: sender, rowIndex: rowIndex, dataItem: dataItem });
        this.editedRowIndex = rowIndex;
        this.currentItem = dataItem;
        //sender.editRow(rowIndex, this.formGroup);
        this.isNew = false;
    };
    BasePopupEditComponent.prototype.cancelHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        this.currentItem = undefined;
        //     this.closeEditor({ sender, rowIndex });
        this.isNew = true;
    };
    BasePopupEditComponent.prototype.closeEditor = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        if (rowIndex == undefined) {
            rowIndex = this.editedRowIndex;
        }
        //       sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    };
    BasePopupEditComponent.prototype.saveHandler = function (item) {
        var saveValue = this.formGroup.value;
        this.editService.save(item, this.isNew);
        this.possaveHandler(item, this.isNew);
    };
    BasePopupEditComponent.prototype.removeHandler = function (_a) {
        var dataItem = _a.dataItem;
        this.editService.remove(dataItem);
    };
    BasePopupEditComponent.prototype.preaddHandler = function (_a) {
        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(0),
        //    'bclass_name': new FormControl("", Validators.required)
        //});
        var sender = _a.sender;
    };
    BasePopupEditComponent.prototype.preeditHandler = function (_a) {
        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(dataItem.bclass_no),
        //    'bclass_name': new FormControl(dataItem.bclass_name, Validators.required)
        //});
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
    };
    BasePopupEditComponent.prototype.possaveHandler = function (item, isNew) {
    };
    return BasePopupEditComponent;
}());
exports.BasePopupEditComponent = BasePopupEditComponent;
//# sourceMappingURL=BasePopupEdit.Component.js.map