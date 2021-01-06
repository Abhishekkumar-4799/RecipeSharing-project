import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  //selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(){ 
    // this.recipeService.recipeSelectedbyUser.subscribe(
    //      (recipeSelected: Recipe)  => {this.selectedRecipe = recipeSelected}
    //   );
      
  }

}
