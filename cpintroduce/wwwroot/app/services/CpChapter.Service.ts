import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSet } from "../provider/appset";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
@Injectable()
export class CpChapterServices  {
    child: boolean;
    cpbclassurl: string = "cpbclass/getcpbclassalldata";
    cpbookurl: string = "cpbook/getcpbookbybclass/";
    cpchapterurl: string = "cpchapter/getcpchapterbybook/";
    cpchapterurl1: string = "cpchapter/getcpchapterbychapter/";
    cpcontentsurl: string = "cpcontents/getcpcontentsbychapter/";

    constructor(public http: HttpClient, protected appset: AppSet) {
         

    }
    public GetCpBclass(): Observable<any[]>  {
        return this.http.get(this.appset.api_url + this.cpbclassurl) 
            .pipe(map(data => <any[]>data));

    }
    public GetCpBookByBclass(cpbclassno: number) :Observable<any[]>  {

        return this.http.get(this.appset.api_url + this.cpbookurl + cpbclassno)
               .pipe(map(data => <any[]>data));
    }
    public GetCpChapterByBook(cpbookno: number): Observable<any[]>  {
        return this.http.get(this.appset.api_url + this.cpchapterurl + cpbookno)
            .pipe(map(data => <any[]>data));
    }
    public GetCpChapterByChapter(cpchapterno: number): Observable<any[]>  {
        return this.http.get(this.appset.api_url + this.cpchapterurl1 + cpchapterno)
            .pipe(map(data => <any[]>data));
    }
    public GetCpContentsByChapter(cpchapterno: number): Observable<any[]> {
        return this.http.get(this.appset.api_url + this.cpcontentsurl + cpchapterno)
            .pipe(map(data => <any[]>data));
    }
    public GetTreeData(node: any) :any {
         
        switch (node.type) {
            case 'A':
                //大類
         
               return  this.GetCpBookByBclass(node.cpbclass_no);
               
            case 'B':
                //書籍
                
                return this.GetCpChapterByBook(node.cpbook_no);

            case 'C':
                //章節
                if (!node.iscontents) {
                    return this.GetCpChapterByChapter(node.cpchapter_no);
                }

            case 'D':
                //章節或內容
                if (!node.iscontents) {
                    if (!node.iscontents) {
                        return this.GetCpChapterByChapter(node.cpchapter_no);
                    }
                }
                
                break;           
       
        }
   //     return this.GetCpBookByBclass(node.cpbookno);
    }

 
}
