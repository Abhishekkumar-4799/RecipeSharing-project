import { NgModule } from '@angular/core';

import { DropdowndirectiveDirective } from '../shared/dropdowndirective.directive';
import { CursorStylePointer } from '../shared/cursorstylepointer.directive';
import { LoadingComponent } from '../shared/Spinner/loading/loading.component';
import { AlertsComponent } from '../shared/alerts/alerts.component';
import { placeholderDirective } from '../shared/placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';


@NgModule ({
  declarations:[
    DropdowndirectiveDirective,
    CursorStylePointer,
    LoadingComponent,
    AlertsComponent,
    placeholderDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[
    DropdowndirectiveDirective,
    CursorStylePointer,
    LoadingComponent,
    AlertsComponent,
    placeholderDirective
  ]
})
export class SharedModule {

}