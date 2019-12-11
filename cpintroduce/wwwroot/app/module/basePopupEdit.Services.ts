import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSet } from "../provider/appset";
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'delete';
@Injectable()
export abstract class basePopupEditServices extends BehaviorSubject<any[]>  {
    private data: any[] = [];
    private saveurl: string;
    private queryurl: string;
    private oldItem: any;
    busya = new BehaviorSubject<string[]>([]);
    constructor(public http: HttpClient, protected appset: AppSet, protected confirmservice: ConfirmationService) {
        super([]);

    }

    public setOldItem(item: any) {
        this.oldItem = item;
    }

    public read() {

        this.busya.next(["busy"]);
        if (this.data.length) {
            super.next(this.data);
            this.busya.next([]);
        }
        else {
            this.fetch()
                .pipe(
                tap((data: any) => {
                    this.data = data;
                }))
                .subscribe((data: any) => {
                    this.data = data;
                    super.next(data);
                    this.busya.next([]);
                }, (error) => { this.busya.next([]); console.log(error); });
        }
    }

    public fetch(querystr: string = "ALL") {
        this.busya.next(["busy"]);
        this.reset();
        return this.http.get(this.appset.api_url + this.queryurl + "/" + querystr);
        //.map(response => reponse.json());

    }

    public doQuery(querystring: string = "ALL") {
        this.busya.next(["busy"]);
        if (querystring == "") {
            querystring = "ALL";
        }
        this.reset();
        this.fetch(querystring)
            .pipe(
            tap((data: any) => {
                this.data = data;
            }))
            .subscribe((data: any) => {
                this.data = data;
                super.next(data);
                this.busya.next([]);
            },
            (error) => { this.busya.next([]); console.log(error); }
            );
    }



    public savedata(action: string = "", data?: any) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.appset.api_url + this.saveurl + "/" + action, data, { headers: headers });
    }

    public save(data: any, isNew?: boolean) {
        this.busya.next(["busy"]);
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.savedata(action, data)
            .subscribe((sdata) => {
                if (isNew) {
                    let tempdata = [...this.data];
                    this.data = [];
                    tempdata.splice(0, 0, sdata);                    
                    this.data = [...tempdata];               
                    super.next(this.data);
                }
                else {
                    var index = this.findSelecteIndex(this.oldItem);                   
                    let tempdata = [...this.data];
                    this.data = [];
                    tempdata.splice(index, 1, data);                  
                    this.data = [...tempdata];                 
                    super.next(this.data);
                }
                this.busya.next([]);
                this.appset.sayAlert("存檔成功");
            },
            (ERROR) => { this.busya.next([]); this.appset.sayAlert("存檔失敗"); }
            );
    }

    public remove(data: any) {

        this.confirmservice.confirm({
            message: '是否確認刪除資料?',
            accept: () => {

                this.removedata(data).subscribe((SUCCESS: any) => {
                    this.appset.sayAlert("刪除成功")

                },
                    (ERROR: any) => {
                        this.appset.sayAlert("刪除失敗")
                    }
                );
            },
            reject: () => { console.log("cance") }
        });




    }

    public removedata(data: any) {
        //  this.reset();
        let index = this.findSelecteIndex(data);
        let tempdata = [...this.data];
        this.data = [];
        tempdata.splice(index, 1);
        this.data = [...tempdata];
        super.next(this.data);
        return this.savedata(REMOVE_ACTION, data);
    }

    public resetItem(dataItem: any) {
        //if (!dataItem) { return; }
        ////find orignal data item
        //const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

    }

    private reset() {
        this.data = [];
    }
    public getData() {
        return this.data;
    }
    public set saveUrl(url: string) {
        this.saveurl = url;
    }
    public set queryUrl(url: string) {
        this.queryurl = url;
    }

    private findSelecteIndex(data: any): number {
        return this.data.indexOf(data);
    }
} 