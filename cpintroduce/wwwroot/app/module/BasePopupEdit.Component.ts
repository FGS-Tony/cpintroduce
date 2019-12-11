import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { basePopupEditServices } from './basePopupEdit.Services';
import { map } from 'rxjs/operators/map';
//import { tap } from 'rxjs/operators/tap';
export abstract class BasePopupEditComponent implements OnInit {

    busy: string[] = [];
    public querystring: string = "";
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    private currentRow: number = 0;
    public formGroup: FormGroup;
    //  sort: [{ field: 'bclass_no', dir: 'desc' }],
    protected editService: basePopupEditServices;
    private editedRowIndex: number;
    private currentItem: any;
    private isNew: boolean;
    constructor(baseServiceFactory: any) {
        this.editService = baseServiceFactory;

    }

    public ngOnInit(): void {

        this.editService.busya.subscribe((data) => {
            this.busy = data;

        });
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
    }
    public doQuery() {
        this.editService.doQuery(this.querystring);
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    protected addHandler({ sender }: { sender: any }) {
      
        var rowIndex = undefined;
     //   this.closeEditor({ sender, rowIndex });
        this.preaddHandler(sender);
            //sender.addRow(this.formGroup);
        this.currentItem = undefined;
        this.isNew = true;
    }

    protected editHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {
   
   //     this.closeEditor({ sender, rowIndex });
        this.editService.setOldItem(dataItem);
        this.preeditHandler({ sender, rowIndex, dataItem });
        this.editedRowIndex = rowIndex;
        this.currentItem = dataItem;
          //sender.editRow(rowIndex, this.formGroup);
        this.isNew = false;
    }

    protected cancelHandler({ sender, rowIndex }: { sender: any, rowIndex: any }) {
     
        this.currentItem = undefined;
        //     this.closeEditor({ sender, rowIndex });
        this.isNew = true;
    }

    private closeEditor({ sender, rowIndex }: { sender: any, rowIndex: any }) {

        if (rowIndex == undefined) {
            rowIndex = this.editedRowIndex;
        }
 //       sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    protected saveHandler(item: any) {
      
        const saveValue: any = this.formGroup.value;
        this.editService.save(item, this.isNew);
 
        this.possaveHandler(item, this.isNew);
 
    }

    protected removeHandler({ dataItem }: { dataItem: any }) {

        this.editService.remove(dataItem);
        
    }

   

    protected preaddHandler({ sender }: { sender: any }) {


        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(0),
        //    'bclass_name': new FormControl("", Validators.required)
        //});

    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {


        //this.formGroup = new FormGroup({
        //    'bclass_no': new FormControl(dataItem.bclass_no),
        //    'bclass_name': new FormControl(dataItem.bclass_name, Validators.required)
        //});

    }
    protected possaveHandler(item: any, isNew: any) {

    }


}