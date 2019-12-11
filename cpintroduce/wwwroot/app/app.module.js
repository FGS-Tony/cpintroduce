"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AuthGuard_1 = require("./share/AuthGuard");
var http_2 = require("@angular/common/http");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var app_service_1 = require("./app.service");
var appset_1 = require("./provider/appset");
//import '@progress/kendo-ui'; 
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var ng2_summernote1_1 = require("./directive/ng2-summernote1");
var kendoui_module_1 = require("./kendoui.module");
var primeng_1 = require("primeng/primeng");
var messageservice_1 = require("primeng/components/common/messageservice");
var keep_html_pipe_1 = require("./directive/keep-html.pipe");
var PassCpintroComponent_1 = require("./share/PassCpintroComponent");
var ErrorComponent_1 = require("./share/ErrorComponent");
kendo_angular_intl_1.load(require("cldr-data/supplemental/likelySubtags.json"), require("cldr-data/supplemental/currencyData.json"), require("cldr-data/supplemental/weekData.json"), require("cldr-data/main/zh/numbers.json"), require("cldr-data/main/zh/currencies.json"), require("cldr-data/main/zh/dateFields.json"), require("cldr-data/main/zh/ca-gregorian.json"), require("cldr-data/main/zh/timeZoneNames.json"));
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, http_2.HttpClientModule, kendoui_module_1.PrimengModule.slice(), kendoui_module_1.KendouiModule.slice(), kendo_angular_intl_1.IntlModule, forms_1.FormsModule, http_1.HttpModule, forms_1.ReactiveFormsModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent, keep_html_pipe_1.EscapeHtmlPipe, ng2_summernote1_1.Ng2Summernote1, app_routing_1.routedComponents.slice(), PassCpintroComponent_1.PassCpIntroComponent, ErrorComponent_1.ErrorComponent],
            providers: [appset_1.AppSet, AuthGuard_1.AuthGuard, common_1.DatePipe, app_service_1.appService.slice(), { provide: core_1.LOCALE_ID, useValue: "zh" }, primeng_1.ConfirmationService, messageservice_1.MessageService],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map