"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimengModule = exports.KendouiModule = void 0;
//Kendo ui
var kendo_angular_grid_1 = require("@progress/kendo-angular-grid");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_upload_1 = require("@progress/kendo-angular-upload");
var kendo_angular_label_1 = require("@progress/kendo-angular-label");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_treeview_1 = require("@progress/kendo-angular-treeview");
exports.KendouiModule = [kendo_angular_grid_1.GridModule, kendo_angular_buttons_1.ButtonsModule, kendo_angular_dialog_1.DialogModule, kendo_angular_dateinputs_1.DateInputsModule,
    kendo_angular_dropdowns_1.DropDownsModule, kendo_angular_upload_1.UploadModule, kendo_angular_label_1.LabelModule, kendo_angular_treeview_1.TreeViewModule, kendo_angular_dialog_1.WindowModule];
//, TabStripModule];
//primeng
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var angular2_busy_1 = require("angular2-busy");
exports.PrimengModule = [primeng_2.TabViewModule, primeng_1.OverlayPanelModule, primeng_2.CalendarModule, primeng_1.MessagesModule, primeng_1.GrowlModule, kendo_angular_inputs_1.InputsModule, primeng_2.ConfirmDialogModule,
    primeng_2.DataGridModule, primeng_1.DataTableModule,
    primeng_1.TreeModule, primeng_2.PanelModule,
    angular2_busy_1.BusyModule.forRoot(new angular2_busy_1.BusyConfig({
        message: '載入中!請稍後.......',
        delay: 200,
        minDuration: 600
    }))];
//# sourceMappingURL=kendoui.module.js.map