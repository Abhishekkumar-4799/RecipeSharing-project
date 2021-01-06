import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingService } from './shopping.service';
import { ShoppingeditComponent } from './shoppingedit/shoppingedit.component';
import { ShoppinglistComponent } from './shoppinglist.component';

const shoppingRoutes: Routes = [{path:'shoppinglist', component: ShoppinglistComponent},]

@NgModule({
  declarations:[
    ShoppinglistComponent,
    ShoppingeditComponent
  ],
  imports:[
    RouterModule.forChild(shoppingRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[],
  providers:[ShoppingService]
})
export class ShoppingModule{

}