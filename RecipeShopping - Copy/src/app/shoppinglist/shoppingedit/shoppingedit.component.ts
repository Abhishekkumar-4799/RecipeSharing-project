import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';
import {NgForm} from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})
export class ShoppingeditComponent implements OnInit,OnDestroy {
  @ViewChild('f') formdata: NgForm;
  
  ingredientitem;
  ingredientIndex;
  formValues;
  subscription: Subscription;
  formEditMode = false;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number)=>{
        this.formEditMode=true;
        this.ingredientIndex=index;
        this.ingredientitem=this.shoppingService.getIngredient(index);
        this.formdata.setValue({
                                'ingredientName': this.ingredientitem.name,
                                'ingredientQuantity': this.ingredientitem.amount,
                              })        
      }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddItem(){
    this.formValues = this.formdata.value
    this.ingredientitem = new Ingredient(this.formValues.ingredientName,this.formValues.ingredientQuantity);
 
    if ( this.formEditMode ){
      this.shoppingService.updateIngredient(this.ingredientIndex,this.ingredientitem);
    } else {
      this.shoppingService.addIngredienttoList(this.ingredientitem);    
    }
    this.formEditMode = false;
    this.formdata.reset();
  } 
  
  onDelete(){
    if(this.formEditMode){
      this.formEditMode=false;
      this.shoppingService.deleteIngredient(this.ingredientIndex);
      this.formdata.reset();
    }

  }
  onReset(){
    this.formEditMode = false;
    this.formdata.reset();
  }

}
