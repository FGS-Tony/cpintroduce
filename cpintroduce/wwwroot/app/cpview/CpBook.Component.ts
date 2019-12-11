import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { CpBclass, CpBook } from '../provider/Bclass';
import { CpBookServices } from '../services/CpBook.Services';
import { BaseComponent } from '../module/Base.Component';
import { settings } from 'cluster';
 
 
@Component({
    selector: 'cp-book',
    templateUrl: 'cppages/CpBookComponent'
})

export class CpBookComponent extends BaseComponent implements OnInit {
    public cpbclass: any[];
    public maxSort: number;
    public cpbclass_no: number;
    public cpbclass_name: string;
    public queryname: string;
    constructor(private BookServiceFactory: CpBookServices ) {
        super(BookServiceFactory );
        this.editService.saveUrl = "cpbook";
        this.editService.queryUrl = "cpbook/getcpbook"
        
    }
    public ngOnInit(): void {
        super.ngOnInit();
        this.cpbclass = [];
        setTimeout(() => {
            this.BookServiceFactory.GetBclassData().subscribe(
               (data: any) => {
                   this.cpbclass = data;
                   let bclassno = 1;
                   let querystr = "ALL";
                   let queryparm = `${bclassno.toString()}/${querystr}`;
                   this.BookServiceFactory.doQuery(queryparm);
                  //this.BookServiceFactory.read();
                 },
              (error) => console.log(error)
            );
         },1000)    
    }


    protected preaddHandler({ sender }: { sender: any }) {
        this.setNewFormData(0);
        this.BookServiceFactory.GetMaxBookSort().subscribe(
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
            'cpbclass_no': new FormControl(dataItem.cpbclass_no,Validators.required),
            'cpbook_no': new FormControl(dataItem.cpbook_no),
            'cpbook_name': new FormControl(dataItem.cpbook_name, Validators.required),   
            'cpbook_isdisplay': new FormControl(dataItem.cpbook_isdisplay, Validators.required), 
            'cpbook_sort': new FormControl(dataItem.cpbook_sort, Validators.required),   
            'cpbook_isvalid': new FormControl(dataItem.cpbook_isvalid, Validators.required)
        });

    }
    public getcpbclassname(cpbclassno: number): any {
        
 
        return this.cpbclass.find(x => x.cpbclass_no == cpbclassno);
    }

    public setNewFormData(maxsort:number) {
        this.formGroup = new FormGroup({
            'cpbclass_no': new FormControl(null, Validators.required),
            'cpbook_no': new FormControl(0),
            'cpbook_name': new FormControl("", Validators.required),
            'cpbook_sort': new FormControl(maxsort, Validators.required),
            'cpbook_isvalid': new FormControl(true, Validators.required),
            'cpbook_isdisplay': new FormControl(true, Validators.required)
        });
    }
    public doExecQuery() {
        var queryname1: string;
        if (this.queryname == "" || this.queryname == null) {
            queryname1 = "ALL";
        }
        else {
            queryname1 = this.queryname;
        }
       
        let queryparm  = `${this.cpbclass_no}/${queryname1}`;
        this.BookServiceFactory.doQuery(queryparm);
       
    }
}
