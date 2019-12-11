import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { CpBclass } from '../provider/Bclass';
import { CpBclassServices } from '../services/CpBclass.Services';
import { BaseComponent } from '../module/Base.Component';
 
 
@Component({
    selector: 'cp-bclass',   
    templateUrl: 'cppages/CpBclassComponent' 
})

export class CpBclassComponent extends BaseComponent implements OnInit {
    public maxSort: number;
    constructor(private BclassServiceFactory: CpBclassServices ) {
        super(BclassServiceFactory );
        this.editService.saveUrl = "cpbclass";
        this.editService.queryUrl = "cpbclass/getcpbclass"
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
            'cpbclass_no': new FormControl(0),
            'cpbclass_name': new FormControl("", Validators.required),
            'cpbclass_sort': new FormControl(0, Validators.required),
            'cpbclass_isdisplay': new FormControl(true, Validators.required),
            'cpbclass_isvalid': new FormControl(true, Validators.required)
        });

        this.BclassServiceFactory.GetMaxBclassSort().subscribe(
            (data: any) => {
               
                this.maxSort = data.maxsort;                
                this.formGroup.controls["cpbclass_sort"].setValue(this.maxSort);
            },
            (error) => {
                console.log(error);
            }
        );

    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {
        this.formGroup = new FormGroup({
            'cpbclass_no': new FormControl(dataItem.cpbclass_no),
            'cpbclass_name': new FormControl(dataItem.cpbclass_name, Validators.required),
            'cpbclass_sort': new FormControl(dataItem.cpbclass_sort, Validators.required),
            'cpbclass_isdisplay': new FormControl(dataItem.cpbclass_isdisplay, Validators.required),
            'cpbclass_isvalid': new FormControl(dataItem.cpbclass_isvalid, Validators.required)
        });
     
    }

}
