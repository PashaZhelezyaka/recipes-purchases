import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolver } from "./recipe.resolver";


const recipeRoutes: Routes = [
  {
    path: "", component: RecipesComponent, title: "Recipes", canActivate: [AuthGuard], children: [
      {path: "", component: RecipeStartComponent},
      {path: "new", component: EditRecipeComponent},
      {path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ":id/edit", component: EditRecipeComponent, resolve: [RecipeResolver]}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
