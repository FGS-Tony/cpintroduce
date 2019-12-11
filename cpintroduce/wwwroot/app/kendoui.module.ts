
//Kendo ui
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog'; 
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploadModule } from '@progress/kendo-angular-upload';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
 
export const KendouiModule = [GridModule, ButtonsModule, DialogModule , DateInputsModule,
    DropDownsModule, UploadModule, LabelModule, TreeViewModule, WindowModule ];
    //, TabStripModule];
 
//primeng
import { MessagesModule, GrowlModule, OverlayPanelModule, TreeModule, TreeNode, DataTableModule } from 'primeng/primeng';
import { ConfirmDialogModule, DataGridModule, TabViewModule, PanelModule, CalendarModule } from 'primeng/primeng';
import { BusyModule, BusyConfig } from 'angular2-busy';
export const PrimengModule = [TabViewModule,OverlayPanelModule, CalendarModule, MessagesModule, GrowlModule, InputsModule, ConfirmDialogModule, 
    DataGridModule, DataTableModule,
    TreeModule, PanelModule,
    BusyModule.forRoot(
        new BusyConfig({
            message: '載入中!請稍後.......',          
            delay: 200,
            minDuration: 600          
        }))]