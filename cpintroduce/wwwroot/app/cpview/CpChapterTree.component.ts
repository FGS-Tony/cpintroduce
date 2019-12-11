import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { State, process, orderBy } from '@progress/kendo-data-query';
import { CpBclass, CpBook } from '../provider/Bclass';
import { CpChapterTreeServices } from '../services/CpChapterTree.Services';
import { BasePopupEditComponent } from '../module/BasePopupEdit.Component';
import { AppSet } from "../provider/appset";
import { Ng2Summernote1 } from '../directive/ng2-summernote1';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
 
 
@Component({
    selector: 'cp-chaptertree',
    templateUrl: 'cppages/CpChapterTreeComponent'
})

export class CpChapterTreeComponent extends BasePopupEditComponent implements OnInit {
    //public cpbclass: any[];
    public cpbookno: number = 0;
    public cpchapterupper: number = 0;   
    public opened: boolean = false;
    public opened1: boolean = false;
    public hostUpload = "/api/image/UploadImage"
    public uploadFolder = "images";
    public cpchapter_contents:string;
    public contents: string = " ";
    public maxSort: number;
    @ViewChild("savebtn") savebtn: ElementRef; 
    @ViewChild("cancelbtn") cancelbtn: ElementRef;
    constructor(private CpChapterTreeServiceFactory: CpChapterTreeServices  ) {
        super(CpChapterTreeServiceFactory );
        this.editService.saveUrl = "cpchapter";
        this.editService.queryUrl = "cpchapter/getcpchapterbybook"
         
    }
    public ngOnInit(): void {
        super.ngOnInit();
    }

    @Input() set bookno(cpbookno: number) {
        this.editService.queryUrl = "cpchapter/getcpchapterbybook";
        this.CpChapterTreeServiceFactory.doQueryByBookParam(cpbookno);
        if (cpbookno > 0) {
            this.cpbookno = cpbookno;
        }
    }

    @Input() set chapterno(chapterno: number) {
      
        this.editService.queryUrl = "cpchapter/getcpchapterbychapter";
        this.CpChapterTreeServiceFactory.doQueryByBookParam(chapterno);
        if (chapterno > 0) {
            this.cpchapterupper = chapterno;

        }
    }
    @Input() public cpchapter_upname: string;
   
    @Input() set setbookno(cpbookno: number) {

       
        if (cpbookno > 0) {
            this.cpbookno = cpbookno;

        }
    }
    @Output() save: EventEmitter<any> = new EventEmitter();
    protected preaddHandler({ sender }: { sender: any }) {
        this.formGroup = new FormGroup({
            'cpbook_no': new FormControl(this.cpbookno),
            'cpchapter_no': new FormControl(0),
            'cpchapter_sort': new FormControl(0),
            'cpchapter_upper': new FormControl(this.cpchapterupper),
            'cpchapter_iscontents': new FormControl(false),
            'cpchapter_name': new FormControl(""),
            'cpchapter_isvalid': new FormControl(true),
            'cpchapter_contents': new FormControl(" ")
        });
        this.CpChapterTreeServiceFactory.GetMaxCpchapterSort().subscribe(
            (data: any) => {
                this.maxSort = data.maxsort;
                this.formGroup.controls["cpchapter_sort"].setValue(this.maxSort);
            }
        );
       this.opened = true;
    }

    protected preeditHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }) {
   
        if (dataItem.cpchapter_contents == "" || dataItem.cpchapter_contents == null) {           
            dataItem.cpchapter_contents = " ";
        }
        this.formGroup = new FormGroup({
            'cpbook_no': new FormControl(dataItem.cpbook_no),
            'cpchapter_no': new FormControl(dataItem.cpchapter_no),
            'cpchapter_upper': new FormControl(dataItem.cpchapter_upper),
            'cpchapter_iscontents': new FormControl(dataItem.cpchapter_iscontents),
            'cpchapter_sort': new FormControl(dataItem.cpchapter_sort),
            'cpchapter_name': new FormControl(dataItem.cpchapter_name),
            'cpchapter_isvalid': new FormControl(dataItem.cpchapter_isvalid),
            'cpchapter_contents': new FormControl(dataItem.cpchapter_contents)
        });
        this.opened = true;
        

    }
    public editContents(dataItem:any) {
        this.opened = true;
    }
    public close(isnew: boolean) {
      //  console.log(this.cancelbtn);
       
     //  this.cancelbtn.nativeElement.click();
      
        this.opened = false;
        this.opened1 = false;

    }

    public close1() {
        
        this.opened1 = false;

    }
    public preview() {
      this.opened1 = true;
}
    public submit() {
     //   console.log(this.formGroup.value)
     //   this.savebtn.nativeElement.click();
       
        this.opened = false;
        this.saveHandler(this.formGroup.value);
        this.save.emit(this.formGroup.value);
      
    }

    
    //protected possaveHandler() {
      
    //    this.save.emit(this.formGroup.value);
    //}
    //public getcpbclassname(cpbclassno: number): any {

    //    return this.cpbclass.find(x => x.cpbclass_no == cpbclassno);
    //}
}
