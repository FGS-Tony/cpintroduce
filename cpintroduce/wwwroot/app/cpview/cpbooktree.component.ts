import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { CpBclass, CpBook } from '../provider/Bclass';
import { CpBookTreeServices } from '../services/CpBookTree.Services';
import { BaseComponent } from '../module/Base.Component';
 
@Component({
    selector: 'cp-booktree',
    templateUrl: 'cppages/CpBooktreecomponent'
})

export class CpBookTreeComponent extends BaseComponent implements OnInit {
    public cpbclass: any[];
    public cpbclassno: number;
    public maxSort: number;
    constructor(private BookTreeServiceFactory: CpBookTreeServices ) {
        super(BookTreeServiceFactory );
        this.editService.saveUrl = "cpbook";
        this.editService.queryUrl = "cpbook/getcpbookbybclassa"

    }
    public ngOnInit(): void {
        super.ngOnInit();
        this.cpbclass = [];
        this.BookTreeServiceFactory.GetBclassData().subscribe(
            (data: any) => {
                this.cpbclass = data;                
            },
            (error) => console.log(error)
        );



    }

    @Input() set bclassno(cpbclassno: number) {
        this.BookTreeServiceFactory.doQueryByParam(cpbclassno);
        if (cpbclassno > 0) {
            this.cpbclassno = cpbclassno;
        
            //this.cpbclass = [];
            //this.BookServiceFactory.GetBclassData().subscribe(
            //    (data: any) => {
            //        this.cpbclass = data;
                  
            //    },
            //    (error) => console.log(error)
            //);
         
        }
    } 

    @Output() save: EventEmitter<any> = new EventEmitter();

    protected preaddHandler({ sender }: { sender: any }) {
        this.formGroup = new FormGroup({
            'cpbclass_no': new FormControl(this.cpbclassno),
            'cpbook_no': new FormControl(0),
            'cpbook_name': new FormControl("", Validators.required),
            'cpbook_sort': new FormControl(0, Validators.required),
            'cpbook_isvalid': new FormControl(true),
            'cpbook_isdisplay': new FormControl(true, Validators.required)
        });
        this.BookTreeServiceFactory.GetMaxBookSort().subscribe(
            (data: any) => {
                this.maxSort = data.maxsort;
                this.formGroup.controls["cpbook_sort"].setValue(this.maxSort);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {
        this.formGroup = new FormGroup({
            'cpbclass_no': new FormControl(dataItem.cpbclass_no),
            'cpbook_no': new FormControl(dataItem.cpbook_no),
            'cpbook_name': new FormControl(dataItem.cpbook_name, Validators.required),
            'cpbook_sort': new FormControl(dataItem.cpbook_sort, Validators.required),   
            'cpbook_isvalid': new FormControl(dataItem.cpbook_isvalid),
            'cpbook_isdisplay': new FormControl(dataItem.cpbook_isdisplay, Validators.required)
        });

    }
    public getcpbclassname(cpbclassno: number): any {

        return this.cpbclass.find(x => x.cpbclass_no == cpbclassno);
    }

    protected possaveHandler(sender: any, rowIndex: any, formGroup: any, isNew: any) {

        this.save.emit(formGroup);
    }
    protected posremoveHandler(dataitme: any) {
        this.save.emit(dataitme);
    }
}
