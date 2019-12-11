import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { CpChapterServices } from '../services/CpChapter.Service';
import { CpBclass, CpBook, CpChapter, CpContents } from '../provider/Bclass';
import { AppSet } from "../provider/appset";
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { TreeViewComponent } from '@progress/kendo-angular-treeview';
 import { Ng2Summernote1 } from '../directive/ng2-summernote1';
 
@Component({
    selector: 'cp-chapter',
    templateUrl: 'cppages/CpChapterComponent'
})
export class CpChapterComponent implements OnInit {
    constructor(private cpchapterservices: CpChapterServices) { }
    public cpbclass: any[];
    public cpbclassno: number = 0;
    public cpbookno: number = 0;
    public cpbookname: string;
    public cpchapterno: number = 0;
    public cptype: string ;
    public cpbook: CpBook[];
    public currentnode: any;
    public cpchapter_iscontents: boolean = false;
    public cpchapter_name: string;
    public cpchapter_contents: string;
    public cpchpater_contentshtml: string;
    public cpchapter_sort:number;
    @ViewChild("chaptertreeview") CTreeview: TreeViewComponent;
    public ngOnInit(): void {
        
        setTimeout(() => {
            this.cpchapterservices.GetCpBclass().subscribe((data: any) => { this.cpbclass = data; }, (error) => console.log(error));
        },1000)
     }

    public fetchChildren = (item: any) => this.cpchapterservices.GetTreeData(item);
  
 
    public hasChildren (item:any)
    {
 
    return true;
   }
  
 
    public selectChange(node: any) {   
   
        this.currentnode = node;
        switch (node.dataItem.type) {
            case 'A':
                this.cptype = "A";
                this.cpbclassno = node.dataItem.cpbclass_no;
                break;
            case 'B':
                this.cptype = "B";
                this.cpbookno = node.dataItem.cpbook_no;
                this.cpbookname = node.dataItem.cpbook_name;
                break;
            case 'C':
                
                this.cptype = "C";
                this.cpchapterno = node.dataItem.cpchapter_no;
                this.cpbookno = node.dataItem.cpbook_no;
                this.cpchapter_contents = node.dataItem.cpchapter_contents;
                this.cpchapter_name = node.dataItem.cpchapter_name;
                this.cpchapter_sort = node.dataItem.cpchapter_sort;
                this.cpchapter_iscontents = node.dataItem.cpchapter_iscontents;
                break;
        }
    }

    public expand(node: any) {
      
        this.currentnode = node;
        this.selectChange(node);
    
    }
 
    public saveHandler() {
       
        this.CTreeview.focus(this.currentnode.index);
        this.CTreeview.collapse.emit(this.currentnode);
        setTimeout(() => {
            this.CTreeview.expand.emit(this.currentnode);
        }, 500)
       // this.collaspe.emit(this.currentnode);
         this.cpchapterservices.GetTreeData(this.currentnode);
    //    this.expand(this.currentnode);
 
    }

}