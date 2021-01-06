import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public type: string;

    constructor(name:string,desc:string,imagePath:string,ing: Ingredient[],type:string){
       this.name = name;
       this.description = desc;
       this.imagePath = imagePath;
       this.ingredients = ing;
       this.type=type;
    }
}