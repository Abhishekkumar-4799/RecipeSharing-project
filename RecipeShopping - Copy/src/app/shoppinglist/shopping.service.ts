import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';


export class ShoppingService{
   
    private ingredients: Ingredient[]=[];
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

   addIngredienttoList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
   }
   getIngredienttoList(){
    return this.ingredients.slice();
   }
   addIngredientstoList(ingredients: Ingredient[]){
    //for (let ingredient of ingredients){
    //    this.addIngredienttoList(ingredient);
    //}
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients)
   }
   getIngredient(index: number){
    return this.ingredients[index];   
   }
   updateIngredient(index: number, ing: Ingredient){
    this.ingredients[index] = ing;   
    this.ingredientsChanged.next(this.ingredients.slice());
   }
   deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
   }
}