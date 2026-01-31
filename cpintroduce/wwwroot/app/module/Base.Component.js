"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var forms_1 = require("@angular/forms");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var map_1 = require("rxjs/operators/map");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(baseServiceFactory) {
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
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editService.busya.subscribe(function (data) {
            _this.busy = data;
        });
        this.view = this.editService.pipe((0, map_1.map)(function (data) { return (0, kendo_data_query_1.process)(data, _this.gridState); }));
    };
    BaseComponent.prototype.doQuery = function () {
        this.editService.doQuery(this.querystring);
    };
    BaseComponent.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.editService.read();
    };
    BaseComponent.prototype.addHandler = function (_a) {
        var sender = _a.sender;
        var rowIndex = undefined;
        this.closeEditor({ sender: sender, rowIndex: rowIndex });
        this.preaddHandler(sender);
        sender.addRow(this.formGroup);
    };
    BaseComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.closeEditor({ sender: sender, rowIndex: rowIndex });
        this.preeditHandler({ sender: sender, rowIndex: rowIndex, dataItem: dataItem });
        this.editedRowIndex = rowIndex;
        this.editService.setOldItem(dataItem);
        sender.editRow(rowIndex, this.formGroup);
    };
    BaseComponent.prototype.cancelHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        this.closeEditor({ sender: sender, rowIndex: rowIndex });
    };
    BaseComponent.prototype.closeEditor = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        if (rowIndex == undefined) {
            rowIndex = this.editedRowIndex;
        }
        sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    };
    BaseComponent.prototype.saveHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, formGroup = _a.formGroup, isNew = _a.isNew;
        var saveValue = formGroup.value;
        this.editService.save(saveValue, isNew);
        if (!isNew) {
            this.currentRow = rowIndex;
            if ((rowIndex + 1) > this.gridState.take) {
                this.currentRow = rowIndex % this.gridState.take;
            }
            sender.data.data[this.currentRow] = saveValue;
        }
        this.possaveHandler(sender, rowIndex, forms_1.FormGroup, isNew);
        sender.closeRow(rowIndex);
    };
    BaseComponent.prototype.removeHandler = function (_a) {
        var dataItem = _a.dataItem;
        this.editService.remove(dataItem);
        this.posremoveHandler(dataItem);
    };
    BaseComponent.prototype.preaddHandler = function (_a) {
        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(0),
        //    'bclass_name': new FormControl("", Validators.required)
        //});
        var sender = _a.sender;
    };
    BaseComponent.prototype.preeditHandler = function (_a) {
        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(dataItem.bclass_no),
        //    'bclass_name': new FormControl(dataItem.bclass_name, Validators.required)
        //});
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
    };
    BaseComponent.prototype.possaveHandler = function (sender, rowIndex, formGroup, isNew) {
    };
    BaseComponent.prototype.posremoveHandler = function (dataitme) {
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=Base.Component.js.map