"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_module_1 = require("./app/app.module");
(0, core_1.enableProdMode)();
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(app_module_1.AppModule).then(function (success) { return console.log("�Ұʧ���"); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=main.js.map