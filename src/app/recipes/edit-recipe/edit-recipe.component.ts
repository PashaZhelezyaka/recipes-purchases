import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number
  editMode: boolean = false
  recipeForm: FormGroup

  constructor(
    private activeRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private route: Router
    ) { }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  private initForm() {
    let name = ''
    let imagePath = ''
    let description = ''
    let recipeIngredients = new FormArray([])

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      name = recipe.name
      imagePath = recipe.imagePath
      description = recipe.description
      if(recipe.ingredients){
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]\d*$/)
            ]),
          }))
        }
      }

    }

    this.recipeForm = new FormGroup<any>({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    })
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
     name: new FormControl(null, Validators.required),
     amount: new FormControl(null, [
       Validators.required, Validators.pattern(/^[1-9]\d*$/)
     ] )
   }))
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
   if(this.editMode) {
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
   }
   else {
     this.recipeService.addRecipe(this.recipeForm.value);
     this.backRecipesList();
   }
  }

  backRecipesList(){
    this.route.navigate(['recipes']);
  }

}
