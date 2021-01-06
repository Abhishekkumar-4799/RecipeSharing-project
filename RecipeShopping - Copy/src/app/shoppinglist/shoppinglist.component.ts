import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit,OnDestroy {
ingredients: Ingredient[];
ingredientsChangedSub: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredienttoList();
    this .ingredientsChangedSub = this.shoppingService.ingredientsChanged
        .subscribe(
            (ingredients: Ingredient[]) => 
            { this.ingredients = ingredients}
          )
  }
  ngOnDestroy(){
    this.ingredientsChangedSub.unsubscribe();
  }

  addItemtoList(ingredientItem: Ingredient){
    console.log(ingredientItem.name);
    console.log(ingredientItem.amount);
    this.shoppingService.addIngredienttoList(ingredientItem);
  }
  onEditItem(i: number){
    this.shoppingService.startedEditing.next(i);
  }
}
