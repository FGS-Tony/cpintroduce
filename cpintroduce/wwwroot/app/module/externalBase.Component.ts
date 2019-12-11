import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query'; 
import { ExternalBaseService } from '../module/ExternalBase.Service'; 
import { AppSet } from "../provider/appset";
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { CpBclass } from "../provider/Bclass";
import { map } from 'rxjs/operators/map';
export class ExternalBaseComponent implements OnInit {
    busy: string[] = [];
    public queryname: string = "";
    public queryactsdate?: Date;
    public queryactedate?: Date;
    public queryact: string = "";
    public querylocation: string = "";
    public querysdate?: Date = new Date();
    public queryedate?: Date = new Date();
   
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public formGroup: FormGroup;
    //  sort: [{ field: 'bclass_no', dir: 'desc' }],    
    private editedRowIndex: number;
    protected editService:ExternalBaseService; 
    public editDataItem:  any;
    private isNew: boolean;
    constructor(private externalbaseservice: ExternalBaseService, public appset: AppSet,
        public confirmservice: ConfirmationService) {       
        this.editService = externalbaseservice;
    }
   
    public ngOnInit(): void {
        this.editService.busya.subscribe((data) => {
            this.busy = data;
        });
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));       
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    public addHandler() {       
        this.preaddHandler( );
        this.isNew = true;
    }

    public editHandler({ dataItem }: { dataItem: any }) {
       
        this.editService.setOldItem(dataItem);
       
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
        this.editService.setOldItem(undefined);
    }

    public saveHandler(item: any) {
    
        this.editDataItem = undefined;
        this.editService.save(item, this.isNew)
            .subscribe((SUCCESS: any) => {
                if (!this.isNew) {
                    var newRow = SUCCESS;               
                    this.editService.updateRow(newRow);
                    this.appset.sayAlert("存檔成功")

                }
                else {
                    var newRow = SUCCESS;
                    this.editService.addRow(newRow);
                    this.editService.setOldItem(undefined);
                    this.appset.sayAlert("存檔成功")

                }
            },
            (ERROR: any) => {
                console.log(ERROR);
                this.appset.sayAlert("存檔失敗")

              }
            );

    }

    public removeHandler({ dataItem }: { dataItem: any }) {
        this.confirmservice.confirm({
            message: '是否確認刪除資料?',
            accept: () => {

                this.editService.remove(dataItem).subscribe((SUCCESS: any) => {
                    this.appset.sayAlert("刪除成功")

                    this.editDataItem = undefined;
                },
                    (ERROR: any) => {
                        this.appset.sayAlert("刪除失敗")
                    }
                );
            },
            reject: () => { console.log("cance") }
        });
    }
    protected doQuery() {

        this.editService.read();
    }
    protected preaddHandler( ) {
        //var images = new Images();
        //this.editDataItem = images;
        
    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {

 
    }
}
