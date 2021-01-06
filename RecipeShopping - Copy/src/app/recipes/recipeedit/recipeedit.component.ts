import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipeedit',
  templateUrl: './recipeedit.component.html',
  styleUrls: ['./recipeedit.component.css']
})
export class RecipeeditComponent implements OnInit {
  formdata: FormGroup;
  recipe: Recipe;
  id: number;
  editmode: boolean = false;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        if (this.editmode){
          this.recipe = this.recipeService.getRecipe(this.id);
        } 
        this.initRecipeForm(); 
      }
    )  
    console.log(this.formdata) ;
  }
  private initRecipeForm(){
    let recipeName = '';
    let recipePath = '';
    let recipeDescription= '';
    if (this.editmode){
      recipeName        = this.recipe.name;
      recipePath        = this.recipe.imagePath;
      recipeDescription = this.recipe.description 
    }
    this.formdata = new FormGroup({
        'name': new FormControl(recipeName,[Validators.required]),
        'imagePath': new FormControl(recipePath),
        'description': new FormControl(recipeDescription,[Validators.required]),
        'ingredients': new FormArray([])
    })
    if (this.recipe){
      for(var ing=0; ing < this.recipe.ingredients.length ; ing++){
        console.log(ing,this.recipe.ingredients.length);
        (<FormArray >this.formdata.get('ingredients')).push(this.addIngredientsToFormGroup(this.recipe.ingredients[ing]));
      }
    }  
  }
  addIngredientsToFormGroup(ingredient: Ingredient){
    return new FormGroup({
      'name': new FormControl(ingredient.name,[Validators.required]),
      'amount': new FormControl(ingredient.amount,[Validators.pattern(/^[1-9][0-9]*$/),Validators.required])
    })
  }
  
  get controls() { // a getter!
    return (<FormArray>this.formdata.get('ingredients')).controls;
  }
  
  addIngredient(){
    (<FormArray >this.formdata.get('ingredients')).push(this.addIngredientsToFormGroup(new Ingredient('',0)));
  }
  onReset(){
    this.formdata.reset();
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
  onDelete(index: number){
    (<FormArray>this.formdata.get('ingredients')).removeAt(index);
  }
  deleteAllIngredient(){
    (<FormArray>this.formdata.get('ingredients')).clear();
  }
  onSubmit(){
    this.recipe = this.formdata.value;
    console.log(this.recipe);
    if(this.editmode){
      this.recipeService.updateRecipe(this.id,this.recipe);
    } else{
      this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
