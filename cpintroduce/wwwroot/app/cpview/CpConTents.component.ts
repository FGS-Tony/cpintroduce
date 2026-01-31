import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSet } from "../provider/appset";
import { FormGroup, FormControl } from '@angular/forms';
import { CpChapter } from '../provider/Bclass';
 
@Component({
    selector: 'cp-contents',
    templateUrl: 'cppages/cpcontentscomponent',
    styles: ['img { width:270px;height:270px }']
})

export class CpContentsComponent implements OnInit {

    constructor(private http: HttpClient, private appset: AppSet) { }
        @Output() save: EventEmitter<any> = new EventEmitter();
        @Input() public cpchapter_name: string;
        @Input() public cpchapter_contents: string;
        @Input() public cpchapter_sort: number;
        @Input() public set chapterno(chapter_no: number) {
            this.cpchapterno = chapter_no;         
            this.http.get(this.appset.api_url + this.queryUrl + "/" + chapter_no).
                subscribe((data: any) => {
                this.cpchapter_name = data[0].cpchapter_name;
                    this.cpchapter_contents =  data[0].cpchapter_contents;
                }
                ,
                (error) => console.log(error));
            //   this.editService


        }

    public cpchapterno: number = 0;
  
    public queryUrl: string = "cpchapter/getcpchapterbyno";
    public opened: boolean = false;
    public opened1: boolean = false;
    public formGroup: FormGroup;
    public saveUrl: string = "cpchapter";
    public action: string = "updatecontents";
    public cpchapter: CpChapter;
    public hostUpload = "/api/image/UploadImage"
    public uploadFolder = "images";
    public isSubmit = false;
    public ngOnInit(): void {


    }
    public edit() {

        this.opened = true;
    }
    public preview() {
        this.opened1 = true;
    }
    public close() {
        this.opened = false;
    }
    public close1() {
        this.opened1 = false;
    }
    public submit() {
        this.cpchapter = new CpChapter();      
        this.cpchapter.cpchapter_no = this.cpchapterno;
        this.cpchapter.cpchapter_name = this.cpchapter_name;
        this.cpchapter.cpchapter_sort = this.cpchapter_sort;
        this.cpchapter.cpchapter_contents = this.cpchapter_contents;        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (!this.isSubmit) {
            this.isSubmit = true;
            this.http.post(this.appset.api_url + this.saveUrl + "/" + this.action, JSON.stringify(this.cpchapter), { headers: headers }).
                subscribe((data) => {
                    this.appset.sayAlert("存檔成功");
                    this.opened = false;
                    this.save.emit(this.cpchapter);
                    this.isSubmit = false;
                },
                    (error) => { console.log(error); this.appset.sayAlert("存檔失敗"); this.isSubmit = false; });
          
        }
    }
 
}
