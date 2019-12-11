import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { ExternalBaseComponent } from '../module/externalBase.Component';
import { AppSet } from '../provider/appset';
import { ConfirmDialogModule, ConfirmationService, FileUpload } from 'primeng/primeng';
import { VegRoot } from "../provider/vegroot";
import { VegrootEditService } from '../services/VegRootEdit.Services';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector: 'veg-root',
    templateUrl: '/cppages/VegRootComponent'
})

export class VegRootComponent extends ExternalBaseComponent implements OnInit {
    queryString: string = "ALL";
    queryName: string = "";
    vegrootitem: VegRoot;
    constructor(@Inject(VegrootEditService) vegrooteditservice: any, appset: AppSet, private confirmationservice: ConfirmationService, private messageService: MessageService) {
        super(vegrooteditservice, appset, confirmationservice);
        this.editService = vegrooteditservice;
        this.editService.saveUrl = "vegroot";
        this.editService.queryUrl = "/vegroot/getvegroot"
        this.editService.queryparm = `${this.queryString}`;
    }
    public ngOnInit(): void {
        super.ngOnInit();
        /*this.appset.setisLoading(true);*/

        this.editService.read();
    }

    protected preaddHandler() {
        
        this.editDataItem = new VegRoot()
        this.editDataItem.vegroot_no = 0;
        this.editDataItem.vergoot_sort = 0;
        this.editDataItem.vergoot_volume = 0;
        this.editDataItem.vegroot_isvalid = true;
        this.editDataItem.ctime = new Date();
      
    }

    

    public doQuery() {
        this.queryString = this.queryName == "" ? "ALL" : this.queryName;
        this.editService.queryparm = `${this.queryString}`;
        this.editService.doQuery();


    }


    //public handlePeriodChange(e: any) {

    //    this.doQuery();
    //}
    //protected postSave(e: any) {

    //    if (this.editService.getCount() == 0) {
    //        this.queryPeriodName = "";
    //        this.queryString = "ALL";
    //    }
    //    this.doQuery();
    //}
}