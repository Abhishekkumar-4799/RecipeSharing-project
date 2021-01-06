import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appCursorStylePointer]'
})

export class CursorStylePointer {
  @HostBinding('style.cursor') cursor:string='default';
  constructor() { }

  @HostListener('mouseenter') pOnterCusrsor(){
    this.cursor='pointer';
  }
  @HostListener('mouseleave') defaultCursor(){
    this.cursor='default';
  }

}
