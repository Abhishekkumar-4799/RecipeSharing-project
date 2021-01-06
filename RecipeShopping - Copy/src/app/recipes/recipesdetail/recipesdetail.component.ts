import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipesdetail',
  templateUrl: './recipesdetail.component.html',
  styleUrls: ['./recipesdetail.component.css']
})
export class RecipesdetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService
             ,private route: ActivatedRoute
             ,private router: Router) { }

  ngOnInit(){ 
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; 
        this.recipe = this.recipeService.getRecipe(this.id);    
      }
    )  
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo: this.route})
  }
  sendIngredienttoShoppingList(){
    this.recipeService.sendIngredienttoShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shoppinglist']);
  }
  oneditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}
