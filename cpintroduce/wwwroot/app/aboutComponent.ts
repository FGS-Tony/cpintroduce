import { Component ,OnInit} from '@angular/core';
//import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import { Ng2Summernote1 } from './directive/ng2-summernote1';
import { TreeModule, TreeNode, DataTableModule, SharedModule } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

 
@Component({
    selector: 'about',
    //  template: `<h1>Hello {{name}}</h1>`,
    templateUrl: 'cppages/about'
})
export class AboutComponent implements OnInit {
 
    public filesTree1: TreeNode[];
    public filesTree2: TreeNode[];
    public filesTree3 = new BehaviorSubject<TreeNode[]>([]);
    public selectedFile: TreeNode;
    public text: string;
    public treedata: TreeDataA[];
    name = 'Tony';
    data: string = 'appendix';
    data2: string = 'content';
    hostUpload = "/api/image/UploadImage"
    uploadFolder = "images";
    // If you want add editors bindings to some model
    model: any = {
        data: this.data,
        data2: this.data2
    }
 
    public ngOnInit(): void {

      
        this.treedata = [{ no: 1, name: "教育" },
        { no: 2, name: "教育1" },
        { no: 3, name: "教育2" },
        { no: 4, name: "教育3" },
        { no: 5, name: "教育4" }];
        this.filesTree3.next([{
            label: "教育1",
            data: "2",
            type:"big",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder"
        }]);

        this.filesTree2 = [{
            label: "教育1",
            data: "2",
            type:"book",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder"
        }];
        this.filesTree1 = [{
            label: "教育",
            data: "1",
            type: "big",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder" 
        }, {
                label: "教育aaaa",
                data: "12",
                type: "big",
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder",
                children: this.filesTree2
            }
        ];
        this.filesTree2.push({
            label: "教育2",
            data: "3",         
            type:"chapter",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder"
        })
      
    }
    // OnSubmit add current editors bindings to some model
    onSubmit() {
        this.model.data = this.data;
        this.model.data2 = this.data2;
    }
    nodeSelect(evnet: TreeNode) {
        console.log(event);
        console.log(this.selectedFile);
        if (this.selectedFile.data == 1) {
            this.selectedFile.children = [{
                label: "教育222",
                data: "22",
                type:"book",
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder"
            }]
        }
  
    }
}
export class TreeDataA {
    no: number;
    name: string;
}
