import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeeditComponent } from './recipeedit/recipeedit.component';
import { RecipeResolverService } from './recipeResolver.service';
import { RecipesComponent } from './recipes.component';
import { RecipesdetailComponent } from './recipesdetail/recipesdetail.component';
import { RecipestartComponent } from './recipestart/recipestart.component';

const recipeRoutes: Routes = [
  {path:'', 
    component: RecipesComponent, 
    resolve: [RecipeResolverService], 
    canActivate: [AuthGuardService], 
    children: [
      {path: '', component: RecipestartComponent},
      {path: 'new', component: RecipeeditComponent}, 
      {path: ':id', component: RecipesdetailComponent},
      {path: ':id/edit', component: RecipeeditComponent} 
    ]
  }
]  

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})

export class recipeRoutingModule {

}