import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingRouters: Routes = [
  {path: "", component: ShoppingListComponent, title: "Shopping-list"},
]

@NgModule({
  imports: [RouterModule.forChild(shoppingRouters)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
