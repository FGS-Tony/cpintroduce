"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_data_query_1 = require("@progress/kendo-data-query");
var map_1 = require("rxjs/operators/map");
var ExternalBaseComponent = /** @class */ (function () {
    function ExternalBaseComponent(externalbaseservice, appset, confirmservice) {
        this.externalbaseservice = externalbaseservice;
        this.appset = appset;
        this.confirmservice = confirmservice;
        this.busy = [];
        this.queryname = "";
        this.queryact = "";
        this.querylocation = "";
        this.querysdate = new Date();
        this.queryedate = new Date();
        this.gridState = {
            sort: [],
            skip: 0,
            take: 10
        };
        this.editService = externalbaseservice;
    }
    ExternalBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editService.busya.subscribe(function (data) {
            _this.busy = data;
        });
        this.view = this.editService.pipe(map_1.map(function (data) { return kendo_data_query_1.process(data, _this.gridState); }));
    };
    ExternalBaseComponent.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.editService.read();
    };
    ExternalBaseComponent.prototype.addHandler = function () {
        this.preaddHandler();
        this.isNew = true;
    };
    ExternalBaseComponent.prototype.editHandler = function (_a) {
        var dataItem = _a.dataItem;
        this.editService.setOldItem(dataItem);
        this.editDataItem = dataItem;
        this.isNew = false;
    };
    ExternalBaseComponent.prototype.cancelHandler = function () {
        this.editDataItem = undefined;
        this.editService.setOldItem(undefined);
    };
    ExternalBaseComponent.prototype.saveHandler = function (item) {
        var _this = this;
        this.editDataItem = undefined;
        this.editService.save(item, this.isNew)
            .subscribe(function (SUCCESS) {
            if (!_this.isNew) {
                var newRow = SUCCESS;
                _this.editService.updateRow(newRow);
                _this.appset.sayAlert("存檔成功");
            }
            else {
                var newRow = SUCCESS;
                _this.editService.addRow(newRow);
                _this.editService.setOldItem(undefined);
                _this.appset.sayAlert("存檔成功");
            }
        }, function (ERROR) {
            console.log(ERROR);
            _this.appset.sayAlert("存檔失敗");
        });
    };
    ExternalBaseComponent.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this.confirmservice.confirm({
            message: '是否確認刪除資料?',
            accept: function () {
                _this.editService.remove(dataItem).subscribe(function (SUCCESS) {
                    _this.appset.sayAlert("刪除成功");
                    _this.editDataItem = undefined;
                }, function (ERROR) {
                    _this.appset.sayAlert("刪除失敗");
                });
            },
            reject: function () { console.log("cance"); }
        });
    };
    ExternalBaseComponent.prototype.doQuery = function () {
        this.editService.read();
    };
    ExternalBaseComponent.prototype.preaddHandler = function () {
        //var images = new Images();
        //this.editDataItem = images;
    };
    ExternalBaseComponent.prototype.preeditHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
    };
    return ExternalBaseComponent;
}());
exports.ExternalBaseComponent = ExternalBaseComponent;
//# sourceMappingURL=externalBase.Component.js.map