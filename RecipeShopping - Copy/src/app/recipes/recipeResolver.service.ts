import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { map,tap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService){}
    
    recipes :Recipe[]= [];
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        console.log('RecipeResolve',this.recipes.length);
        this.recipes = this.recipeService.getRecipes();
        
        if(this.recipes.length > 0){
            return this.recipes
        }
        const response = this.dataStorage.fetchRecipes().pipe(
            map(
                (recipes: Recipe[]) => {console.log(recipes);
                    for (const key in recipes){
                        this.recipes.push({...recipes[key]})
                    }
                    this.recipeService.setRecipes(this.recipes)  
                    return this.recipes  
                }
            )
        )
        console.log(response);
        
        return response;
    }
}