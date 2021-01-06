import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholderDirective]'
})
export class placeholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
  
}