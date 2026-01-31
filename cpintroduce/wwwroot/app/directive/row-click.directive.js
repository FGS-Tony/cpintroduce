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
exports.RowClickDirective = void 0;
var core_1 = require("@angular/core");
var hasClass = function (el, className) { return new RegExp(className).test(el.className); };
var isChildOf = function (el, className) {
    while (el && el.parentElement) {
        if (hasClass(el.parentElement, className)) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
};
var eq = function (s1, s2) { return s1.toLowerCase() === s2.toLowerCase(); };
var closest = function (el, nodeName) {
    while (el && el.parentElement) {
        if (eq(el.nodeName, nodeName) || eq(el.parentElement.nodeName, nodeName)) {
            return el.parentElement;
        }
        el = el.parentElement;
    }
    return null;
};
var RowClickDirective = /** @class */ (function () {
    function RowClickDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.editRow = new core_1.EventEmitter();
        this.saveRow = new core_1.EventEmitter();
    }
    RowClickDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.listen(this.el.nativeElement, "click", function (_a) {
            var target = _a.target;
            var tr = closest(target, "tr");
            if (tr && !hasClass(tr, "k-grid-edit-row") && isChildOf(target, "k-grid-content")) {
                _this.editRow.emit(tr.rowIndex);
            }
        });
        this.renderer.listen("document", "click", function (_a) {
            var target = _a.target;
            if (!isChildOf(target, "k-grid-content") && !isChildOf(target, "k-grid-toolbar")) {
                _this.saveRow.emit();
            }
        });
    };
    __decorate([
        (0, core_1.Output)(),
        __metadata("design:type", core_1.EventEmitter)
    ], RowClickDirective.prototype, "editRow", void 0);
    __decorate([
        (0, core_1.Output)(),
        __metadata("design:type", core_1.EventEmitter)
    ], RowClickDirective.prototype, "saveRow", void 0);
    RowClickDirective = __decorate([
        (0, core_1.Directive)({
            selector: '[rowClick]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], RowClickDirective);
    return RowClickDirective;
}());
exports.RowClickDirective = RowClickDirective;
//# sourceMappingURL=row-click.directive.js.map