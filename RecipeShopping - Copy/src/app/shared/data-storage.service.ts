import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient,private auth: AuthService){}
    
    createRecipe(recipe: Recipe){
        let response = this.http.post('https://mastercook-24898.firebaseio.com/recipe.json', 
                                       recipe,
                                       { params: new HttpParams().set('auth',this.auth.usreToken) });
        return response;
    }

    fetchRecipes(){
        const response = this.http.get<Recipe[]>('https://mastercook-24898.firebaseio.com/recipe.json',
                                                  {responseType: 'json',params: new HttpParams().set('auth',this.auth.usreToken)})
        return response;
    }                                 
}