import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription$: Subscription

  constructor(private recipeService: RecipeService, private route: Router,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipesSubscription$ = this.recipeService.changeRecipe$.subscribe((recipes => {
      this.recipes = recipes;
    }))
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.route.navigate(['new'],{relativeTo: this.router})
  }

  ngOnDestroy() {
    this.recipesSubscription$.unsubscribe()
  }

}
