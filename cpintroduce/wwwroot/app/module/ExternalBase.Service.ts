import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { CpBclass } from '../provider/Bclass';
import { AppSet } from "../provider/appset";
const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'delete';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
@Injectable()
export abstract class ExternalBaseService extends BehaviorSubject<any[]>  {
    protected data: any[] = [];
    busya = new BehaviorSubject<string[]>([]);
    private saveurl: string;
    private queryurl: string;   
    queryparm: string;
    protected oldItem: any;
    constructor(public http: HttpClient, public appset: AppSet) {
        super([]);

    }
    public set queryParm(queryvalue:string) {
        this.queryparm = queryvalue;
    }
    public get queryParm(): string {
        return this.queryparm;
    }
    public set queryUrl(queryurl: string) {
        this.queryurl = queryurl;
    }
    public set saveUrl(saveurl: string) {
        this.saveurl = saveurl;
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
                    super.next(data);
                    this.busya.next([]);
                });
        }
    }

    public fetch() {
        this.busya.next(["busy"]);
        this.reset();
        //     this.queryparm = `${queryname}/${queryact}/${querysdate.toISOString()}/${queryedate.toISOString()}/${querylocation}`;

        return this.http.get(this.appset.api_url + this.queryurl +   "/" + this.queryparm);

    }

    public doQuery() {
        console.log("doquery");
        this.busya.next(["busy"]);
        this.reset();
        this.fetch()
            .pipe(
                tap((data: any) => {
                    this.data = data;
                }))
            .subscribe((data: any) => {
                super.next(data);
                this.busya.next([]);
            },
                (error) => { this.busya.next([]); console.log(error); }
            );
    }

    public savedata(action: string = "", data?: any) {
      
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });         
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.appset.api_url + this.saveurl + "/" + action , data, { headers: headers });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        //    this.reset();       
        return this.savedata(action, data);

    }

    public remove(data: any) {
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
        if (!dataItem) { return; }

        //find orignal data item
        const originalDataItem = this.data.find(item => item.images_no == dataItem.images_no);

    }

    private reset() {
        //    this.data.find(item => item.images_isactive == true);
        this.data = [];
    }
    public addRow(data: any) {
        let tempdata = [...this.data];
        this.data = [];
        tempdata.push(data);
        this.data = [...tempdata];
        super.next(this.data);

    }
    public updateRow(data: any, ) {

        this.preUpdateRow(data, this.data);
       
        var index = this.findSelecteIndex(this.oldItem);
        let tempdata = [...this.data];
        this.data = [];
        tempdata.splice(index, 1, data);
        //     tempdata.push(JSON.parse(data));
        this.data = [...tempdata];
        super.next(this.data);
    }
    private findSelecteIndex(data: any): number {
        return this.data.indexOf(data);
    }
    protected preUpdateRow(data:any,alldata:any) {
        
    }
    public getCount(): number {
        return this.data.length;
    }
}