import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-recipeslist',
  templateUrl: './recipeslist.component.html',
  styleUrls: ['./recipeslist.component.css']
})
export class RecipeslistComponent implements OnInit,OnDestroy {
subscription: Subscription;
recipes : Recipe[] = [];
  constructor(private recipeService: RecipeService
             ,private router: Router
             ,private route : ActivatedRoute
             ,private dataStorage: DataStorageService) { }

  ngOnInit(){
    this.subscription=this.recipeService.recipeChangedbyUser.subscribe(
      (recipes: Recipe[]) => { console.log('subscription',recipes);
        this.recipes = recipes;
      } 
    )
    this.recipes = this.recipeService.getRecipes();
    console.log('recipelistcomponent.ts','this.recipes',this.recipes)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onNewRcipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
