import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeslistComponent } from '../recipes/recipeslist/recipeslist.component';
import { RecipesdetailComponent } from '../recipes/recipesdetail/recipesdetail.component';
import { RecipeitemComponent } from '../recipes/recipeslist/recipeitem/recipeitem.component';
import { RecipestartComponent } from '../recipes/recipestart/recipestart.component';
import { RecipeeditComponent } from '../recipes/recipeedit/recipeedit.component';
import { RecipeService } from '../recipes/recipe.service';
import { recipeRoutingModule } from './recipeRouting.module';

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeslistComponent,
    RecipeitemComponent,
    RecipesdetailComponent,
    RecipeitemComponent,
    RecipestartComponent,
    RecipeeditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    recipeRoutingModule
  ],
  exports:[]
})
export class RecipeModule{

}