import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { RecipeResolver } from "./recipes/recipe.resolver";


const appRoutes: Routes = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {
    path: "recipes", component: RecipesComponent, title: "recipes" , children: [
      {path: "", component: RecipeStartComponent},
      {path: "new", component: EditRecipeComponent},
      {path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ":id/edit", component: EditRecipeComponent, resolve: [RecipeResolver]}
    ]
  },
  {path: "shopping-list", component: ShoppingListComponent, title: "shopping-list"},
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
