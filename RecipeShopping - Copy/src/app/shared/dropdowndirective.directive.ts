import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdowndirective]'
})
export class DropdowndirectiveDirective {
  @HostBinding('style.backgroundColor') backgroudColor:string='transparent';
  constructor() { }

  @HostListener('mouseenter') highlightoption(){
    this.backgroudColor='grey';
  }
  @HostListener('mouseleave') defaultoption(){
    this.backgroudColor='transparent';
  }

}
