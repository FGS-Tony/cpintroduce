"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
        this.filesTree3 = new BehaviorSubject_1.BehaviorSubject([]);
        this.name = 'Tony';
        this.data = 'appendix';
        this.data2 = 'content';
        this.hostUpload = "/api/image/UploadImage";
        this.uploadFolder = "images";
        // If you want add editors bindings to some model
        this.model = {
            data: this.data,
            data2: this.data2
        };
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.treedata = [{ no: 1, name: "教育" },
            { no: 2, name: "教育1" },
            { no: 3, name: "教育2" },
            { no: 4, name: "教育3" },
            { no: 5, name: "教育4" }];
        this.filesTree3.next([{
                label: "教育1",
                data: "2",
                type: "big",
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder"
            }]);
        this.filesTree2 = [{
                label: "教育1",
                data: "2",
                type: "book",
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
            type: "chapter",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder"
        });
    };
    // OnSubmit add current editors bindings to some model
    AboutComponent.prototype.onSubmit = function () {
        this.model.data = this.data;
        this.model.data2 = this.data2;
    };
    AboutComponent.prototype.nodeSelect = function (evnet) {
        console.log(event);
        console.log(this.selectedFile);
        if (this.selectedFile.data == 1) {
            this.selectedFile.children = [{
                    label: "教育222",
                    data: "22",
                    type: "book",
                    expandedIcon: "fa-folder-open",
                    collapsedIcon: "fa-folder"
                }];
        }
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            //  template: `<h1>Hello {{name}}</h1>`,
            templateUrl: 'cppages/about'
        })
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
var TreeDataA = /** @class */ (function () {
    function TreeDataA() {
    }
    return TreeDataA;
}());
exports.TreeDataA = TreeDataA;
//# sourceMappingURL=aboutComponent.js.map