import { Output, Directive, ElementRef, EventEmitter, Renderer2, OnInit } from '@angular/core';

const hasClass = (el: any, className:any) => new RegExp(className).test(el.className)

const isChildOf = (el: any, className: any) => {
    while (el && el.parentElement) {
        if (hasClass(el.parentElement, className)) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
};

const eq = (s1: any, s2: any) => s1.toLowerCase() === s2.toLowerCase();

const closest = (el: any, nodeName: any) => {
    while (el && el.parentElement) {
        if (eq(el.nodeName, nodeName) || eq(el.parentElement.nodeName, nodeName)) {
            return el.parentElement;
        }
        el = el.parentElement;
    }
    return null;
};
@Directive({
    selector: '[rowClick]'
})
export class RowClickDirective implements OnInit {
    @Output() public editRow: EventEmitter<number> = new EventEmitter<number>();
    @Output() public saveRow: EventEmitter<any> = new EventEmitter<any>();
    constructor(private el: ElementRef, private renderer: Renderer2) { }
    public ngOnInit(): void {
        this.renderer.listen(
            this.el.nativeElement,
            "click",
            ({ target }) => {
                const tr = closest(target, "tr");

                if (tr && !hasClass(tr, "k-grid-edit-row") && isChildOf(target, "k-grid-content")) {
                    this.editRow.emit(tr.rowIndex);
                }
            }
        );
        this.renderer.listen(
            "document",
            "click",
            ({ target }) => {
                if (!isChildOf(target, "k-grid-content") && !isChildOf(target, "k-grid-toolbar")) {
                    this.saveRow.emit();
                }
            });
    }
}