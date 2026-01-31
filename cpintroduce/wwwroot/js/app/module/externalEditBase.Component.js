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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var externalEditBaseComponent = /** @class */ (function () {
    function externalEditBaseComponent(_fb) {
        this._fb = _fb;
        this.isNew = false;
        this.cancel = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this.myform = forms_1.FormControl;
        this.editForm = this._fb.group({});
        this.active = false;
        this.isSave = false;
    }
    Object.defineProperty(externalEditBaseComponent.prototype, "model", {
        set: function (dataModel) {
            this.editForm.reset(dataModel);
            this.active = dataModel !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    externalEditBaseComponent.prototype.onSave = function (_a) {
        var e = _a.e;
        this.isSave = true;
        this.save.emit(this.editForm.value);
        this.active = false;
    };
    externalEditBaseComponent.prototype.onCancel = function (_a) {
        var e = _a.e;
        //e.preventDefault();
        this.isSave = false;
        this.closeForm();
    };
    externalEditBaseComponent.prototype.closeForm = function () {
        this.active = false;
        this.isSave = false;
        this.cancel.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], externalEditBaseComponent.prototype, "isNew", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], externalEditBaseComponent.prototype, "model", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], externalEditBaseComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], externalEditBaseComponent.prototype, "save", void 0);
    return externalEditBaseComponent;
}());
exports.externalEditBaseComponent = externalEditBaseComponent;
//# sourceMappingURL=externalEditBase.Component.js.map