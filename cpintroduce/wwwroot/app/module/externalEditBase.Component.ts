import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SelectEvent, UploadEvent, SuccessEvent } from "@progress/kendo-angular-upload/dist/es/upload-events";
import { FileRestrictions } from "@progress/kendo-angular-upload/dist/es/file-restrictions";
import { UUID } from 'angular2-uuid';
 
 
export abstract class externalEditBaseComponent {
    constructor(protected _fb: FormBuilder) { }
    @Input() public isNew: boolean = false;
    @Input() public set model(dataModel: any) {      
        this.editForm.reset(dataModel);
        this.active = dataModel !== undefined;
   
    }
   

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    public myform = FormControl;
    public editForm = this._fb.group({});     
    private active: boolean = false; 
    public isSave: boolean = false; 
    public onSave({ e }: { e: any }): void {
        this.isSave = true;
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel({ e }: { e: any }): void {
        //e.preventDefault();
        this.isSave = false;
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.isSave = false;
        this.cancel.emit();
    }

}