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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Ng2Summernote1 = /** @class */ (function () {
    function Ng2Summernote1(_elementRef, _zone, _http) {
        this._elementRef = _elementRef;
        this._zone = _zone;
        this._http = _http;
        /** Uploaded images server folder */
        this.uploadFolder = "";
        this.change = new core_1.EventEmitter();
    }
    Ng2Summernote1_1 = Ng2Summernote1;
    Object.defineProperty(Ng2Summernote1.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Ng2Summernote1.prototype.ngAfterViewInit = function () { };
    /**
     * Value update process
     */
    Ng2Summernote1.prototype.updateValue = function (value) {
        var _this = this;
        this._zone.run(function () {
            _this._value = value;
            _this.onChange(value);
            _this._onTouchedCallback();
            _this.change.emit(value);
        });
    };
    Ng2Summernote1.prototype.ngOnDestroy = function () { };
    Ng2Summernote1.prototype._imageUpload = function (dataUpload) {
        var _this = this;
        if (dataUpload.editable) {
            var data = new FormData();
            data.append("file", dataUpload.files[0]);
            data.append("action", "upload");
            data.append("image", "resizeNoThumb");
            data.append("folder", this.uploadFolder);
            $.post({
                data: data,
                type: "POST",
                url: this.hostUpload,
                cache: false,
                contentType: false,
                processData: false,
                success: function (uploadedImg) {
                    var insertImg = $('<img src="' + uploadedImg.fileName + '" />');
                    $(_this._elementRef.nativeElement).find('.summernote').summernote('insertNode', insertImg[0]);
                },
                error: function (err) { _this._errHandle(err); }
            });
        }
    };
    Ng2Summernote1.prototype._mediaDelete = function (fileUrl) {
        var data = JSON.stringify({
            action: "del",
            file: fileUrl
        });
        var headers = new http_1.Headers({
            'Accept': '*/*',
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.hostUpload, data, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(function (err) { return Promise.reject(err.message || err); });
    };
    /**
     * Set logical varibles from text input values
     *
     * @param any variable, logic varible for setting
     * @param boolean defaultValue, this value will be set if variable is not set
     *
     * @return boolean variable, finally setted variable value
     */
    Ng2Summernote1.prototype._setLogicVars = function (variable, defaultVal) {
        variable = typeof variable !== 'undefined' ? true : false;
        if (!variable && defaultVal)
            variable = defaultVal;
        return variable;
    };
    /**
     * Hanle error in console
     */
    Ng2Summernote1.prototype._errHandle = function (err) {
        console.error("Error");
        console.log(err);
    };
    /**
     * Implements ControlValueAccessor
     */
    Ng2Summernote1.prototype.writeValue = function (value) {
        var _this = this;
        if (value) {
            this._value = value;
            this.height = Number(this.height);
            this.editable = this._setLogicVars(this.editable, true);
            this.lang = $.summernote.lang[this.lang] ? this.lang : 'zh-TW';
            this._config = this.config || {
                height: this.height || 200,
                minHeight: Number(this.minHeight) || this.height || 200,
                maxHeight: Number(this.maxHeight) || this.height || 500,
                placeholder: this.placeholder || '請輸入內容...',
                focus: this._setLogicVars(this.focus, false),
                airMode: this._setLogicVars(this.airMode, false),
                dialogsInBody: this._setLogicVars(this.dialogsInBody, false),
                editable: this.editable,
                lang: this.lang,
                disableResizeEditor: this._setLogicVars(this.disableResizeEditor, false),
            };
            this._config.callbacks = {
                onChange: function (evt) {
                    _this.updateValue(evt);
                },
                onInit: function (evt) { }
            };
            if (typeof this.serverImgUp !== 'undefined') {
                this._config.callbacks.onImageUpload = function (files) {
                    _this._imageUpload({ files: files, editable: _this.editable });
                };
                this._config.callbacks.onMediaDelete = function (target) {
                    var fileUrl;
                    var attributes = target[0].attributes;
                    for (var i = 0; i < attributes.length; i++) {
                        if (attributes[i].name == "src") {
                            fileUrl = attributes[i].value;
                        }
                    }
                    _this._mediaDelete(fileUrl)
                        .then(function (resp) { console.log(resp.json().data); })
                        .catch(function (err) { _this._errHandle(err); });
                };
            }
            $(this._elementRef.nativeElement).find('.summernote').summernote(this._config);
            $(this._elementRef.nativeElement).find('.summernote').summernote('code', value);
        }
    };
    Ng2Summernote1.prototype.onChange = function (_) { };
    Ng2Summernote1.prototype.onTouched = function () { };
    Ng2Summernote1.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    Ng2Summernote1.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Ng2Summernote1.prototype._onChangeCallback = function (_) { };
    Ng2Summernote1.prototype._onTouchedCallback = function () { };
    var Ng2Summernote1_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Ng2Summernote1.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Ng2Summernote1.prototype, "minHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Ng2Summernote1.prototype, "maxHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Ng2Summernote1.prototype, "focus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Ng2Summernote1.prototype, "airMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "dialogsInBody", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Ng2Summernote1.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "disableResizeEditor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Ng2Summernote1.prototype, "serverImgUp", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Ng2Summernote1.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "hostUpload", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2Summernote1.prototype, "uploadFolder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Ng2Summernote1.prototype, "change", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Ng2Summernote1.prototype, "value", null);
    Ng2Summernote1 = Ng2Summernote1_1 = __decorate([
        core_1.Component({
            selector: 'ng2-summernote1',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return Ng2Summernote1_1; }),
                    multi: true
                }
            ],
            template: "<div class=\"summernote\"></div>",
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.NgZone,
            http_1.Http])
    ], Ng2Summernote1);
    return Ng2Summernote1;
}());
exports.Ng2Summernote1 = Ng2Summernote1;
//# sourceMappingURL=ng2-summernote1.js.map