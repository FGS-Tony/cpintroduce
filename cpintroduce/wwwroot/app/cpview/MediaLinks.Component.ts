import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { MediaLinksServices } from '../services/MediaLinks.Services';
import { BaseComponent } from '../module/Base.Component';


@Component({
    selector: 'cp-medialinks',
    templateUrl: 'cppages/MediaLinksComponent'
})

export class MediaLinksComponent extends BaseComponent implements OnInit {

    constructor(private MediaLinksServicesFactory: MediaLinksServices) {
        super(MediaLinksServicesFactory);
        this.editService.saveUrl = "links";
        this.editService.queryUrl = "links/getmedialinks"
        //     this.editService = baseServiceFactory;
    }
    public ngOnInit(): void {
        super.ngOnInit();
        setTimeout(() => {
            this.editService.read();
        }, 1000)

    }


    protected preaddHandler({ sender }: { sender: any }) {
        this.formGroup = new FormGroup({
            'links_no': new FormControl(0),
            'links_url': new FormControl("", Validators.required),
            'links_name': new FormControl("", Validators.required),
            'links_sort': new FormControl(0, Validators.required),
            'links_isdisplay': new FormControl(true, Validators.required),
            'links_isvalid': new FormControl(true, Validators.required),
            'links_type': new FormControl(2)
        });

    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {
        this.formGroup = new FormGroup({
            'links_no': new FormControl(dataItem.links_no),
            'links_url': new FormControl(dataItem.links_url, Validators.required),
            'links_name': new FormControl(dataItem.links_name, Validators.required),
            'links_sort': new FormControl(dataItem.links_sort, Validators.required),
            'links_isdisplay': new FormControl(dataItem.links_isdisplay, Validators.required),
            'links_isvalid': new FormControl(dataItem.links_isvalid, Validators.required),
            'links_type': new FormControl(dataItem.links_type)
        });

    }

}
