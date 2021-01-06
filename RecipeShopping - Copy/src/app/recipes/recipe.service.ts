import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from '../shoppinglist/shopping.service';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';


@Injectable({providedIn: 'root'})
export class RecipeService{
   constructor(private shoppingService: ShoppingService, 
               private dataStorage: DataStorageService,
              ){}

   recipeChangedbyUser  = new Subject<Recipe[]>();
   recipeLoaded = false; 
   recipeAdd = false;
   private recipes: Recipe[] = [];

    getRecipes(){
        
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeLoaded = true;
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    sendIngredienttoShoppingList(ingredient: Ingredient[]){
        this.shoppingService.addIngredientstoList(ingredient);       
    }

    addRecipe(recipe:Recipe){
        this.dataStorage.createRecipe(recipe).subscribe(
            (response) => {
                console.log(response)
                this.recipes.push(recipe);
                this.recipeChangedbyUser.next(this.recipes.slice());
            }
        )
        
    }
    updateRecipe(index:number,recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipeChangedbyUser.next(this.recipes.slice());
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipeChangedbyUser.next(this.recipes.slice());
    }
}