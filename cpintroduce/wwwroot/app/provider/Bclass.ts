import { NgModule } from '@angular/core';
export class CpBclass {
  cpbclass_no: number;
  cpbclass_name: string;
    cpbclass_isdisplay: boolean;
    cpbclass_sort: number;
  cpbclass_isvalid: boolean;
  etime: Date;
  euser: string;
  ctime: Date;  
  cuser: string;
  type: string = "A"; 
}
export class CpBook {
    cpbclass_no: number;
    cpbook_no: number;
    cpbook_name: string;
    cbbook_sort: number;
    cpbook_isvalid: boolean;
    cpbook_isdisplay: boolean;
    etime: Date;
    euser: string;
    ctime: Date;
    cuser: string;
   type:string = "B"
}
export class CpChapter {
    public    cpchapter_no: number;
    public    cpchapter_name: string;
    public     cpchapter_upper: number;
    public cpchapter_level: number;
    public cpchapter_sort: number;
    public cpchapter_contents: string;
    public cpchapter_contentshtml: string;
    public etime: Date;
    public euser: string;
    public ctime: Date;
    public cuser: string;
    public type:string= "C";
}
export class CpContents {
    cpchapter_no: number;
    cpcontents_no: number;
    cpcontents_contents: string;
    etime: Date;
    euser: string;
    ctime: Date;
    cuser: string;
}