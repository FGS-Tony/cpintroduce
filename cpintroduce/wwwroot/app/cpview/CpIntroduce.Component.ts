import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSet } from "../provider/appset";
import { FormGroup, FormControl } from '@angular/forms';
import { CpIntroduce } from '../provider/ICpintroduce';
 
@Component({
    selector: 'cp-intrduce',
    templateUrl: 'cppages/cpintroducecomponent',
    styles: ['img { width:270px;height:270px }']
})

export class CpIntroduceComponent implements OnInit   {
    
    public hostUpload = "/api/image/UploadImage"
    public uploadFolder = "images";
    public cpintro_no: number;
    public cpintro_preface: string;
    public cpintro_intro: string;
    public cpintro_master: string;
    public cpintro_masterroad: string;
    formGroup: FormGroup;
    cpintroduce: CpIntroduce;
    action: string = "create";
    constructor(private http: HttpClient, private appset: AppSet) { }
    public ngOnInit() {
        this.getIntrduce();
        this.insertData();
    }
 
    public updateIntrduce() {
        this.cpintro_no = this.cpintroduce.cpintro_no;
        this.cpintro_preface = this.cpintroduce.cpintro_preface;
        this.cpintro_intro = this.cpintroduce.cpintro_intro;
        this.cpintro_master = this.cpintroduce.cpintro_master;
        this.cpintro_masterroad = this.cpintroduce.cpintro_masterroad;
       
        //this.formGroup = new FormGroup({
        //    "cpintro_no": new FormControl(this.cpintroduce.cpintro_no),
        //    "cpintro_preface": new FormControl(this.cpintroduce.cpintro_preface),
        //    "cpintro_intro": new FormControl(this.cpintroduce.cpintro_intro),
        //    "cpintro_master": new FormControl(this.cpintroduce.cpintro_master)
        //});
        this.action = "update";
    }
    public insertData() {
        this.cpintro_no = 0;
        this.cpintro_preface = " ";
        this.cpintro_intro = " ";
        this.cpintro_master = " ";
        this.cpintro_masterroad = " ";
        //this.formGroup = new FormGroup({
        //    "cpintro_no": new FormControl(0),
        //    "cpintro_preface": new FormControl(""),
        //    "cpintro_intro": new FormControl(""),
        //    "cpintro_master": new FormControl("")
        //});
        this.action = "create";
    }
    public saveIntrduce() {
        //let cpdata = this.formGroup.value;
        this.cpintroduce = new CpIntroduce();
        this.cpintroduce.cpintro_no = this.cpintro_no;
        this.cpintroduce.cpintro_preface = this.cpintro_preface;
        this.cpintroduce.cpintro_intro = this.cpintro_intro;
        this.cpintroduce.cpintro_master = this.cpintro_master;
        this.cpintroduce.cpintro_masterroad = this.cpintro_masterroad;
        let cpdata =  JSON.stringify(this.cpintroduce )
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.appset.api_url + "cpintroduce/" + this.action, cpdata, { headers: headers }).subscribe
            ((data: any) => {
                if (this.action == 'update') {
                    //  this.formGroup.controls["cpintro_no"].setValue(data.cpintro_no);
                    this.cpintro_no = data.cpintro_no;
                    this.action = "update";
                }
                this.appset.sayAlert("存檔成功");
            },
            (error) => {
                console.log(error),
                this.appset.sayAlert("存檔失敗")
            });
    }
    public getIntrduce() {
        this.http.get(this.appset.api_url + "cpintroduce/getcpintroduce").subscribe(
            (data: any) => {
              
                if (data.isdata > 0) {
                    this.cpintroduce = data.cpintroducedata;
                    this.updateIntrduce();
                }
                else {
                    this.insertData();
                }
            },
            (error) => { console.log(error)}
        );
    }
    
}
