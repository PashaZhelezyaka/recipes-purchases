import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://recepie-book-a577c-default-rtdb.europe-west1.firebasedatabase.app/recipe.json'

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.url, recipes)
        .subscribe(res => {
          console.log(res)
        })
  }

  fetchData(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url)
               .pipe(map(recipes => {
                   return recipes.map(recipe => {
                     return {...recipe, ingredients: recipe.ingredients ?? []}
                   })
                 }),
                 tap(recipes => {
                   this.recipeService.setRecipes(recipes)
                 })
               )

  }
}
