import { Component, Input, Output, EventEmitter } from '@angular/core';
import { externalEditBaseComponent } from "../module/externalEditBase.Component";
import { VegrootEditService } from '../services/VegRootEdit.Services';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppSet } from '../provider/appset';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
 

@Component({
    selector: 'vegroot-edit-form',
    styles: ['input[type=text] { width: 80%; max-width:800px} .k-switch-label-off, .k-switch-label-on{ color: red }'],
    templateUrl: '/cppages/vegrooteditcomponent'
})

export class VegRootEditComponent extends externalEditBaseComponent {

    constructor(public _fb: FormBuilder, private messageService: MessageService,
        private vegrootservice: VegrootEditService , private appset: AppSet) {
        super(_fb);

    }

    public editForm = this._fb.group({
        'vegroot_no': [0],
        'vegroot_volume': [0 ,Validators.required],
        'vegroot_seq': [0],
        'vegroot_content': ["", Validators.required],
        'vegroot_isvalid': [true],     
        'ctime': [new Date()],
        'etime': [new Date()],
        'cuser': [""],
        'euser': [""]
    });
  

}