import {
  Component,
  OnInit,
  ViewChild, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') formEdit: NgForm
  subscriptionIndexEdit: Subscription
  editMode: boolean = false
  editItemIndex: number
  editItem: Ingredient

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscriptionIndexEdit = this.slService.startEditIngredient$.subscribe((index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.slService.getIngredient(index);
      this.formEdit.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      })
    })
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    }
    else {
      this.slService.addIngredient(newIngredient);
    }
    this.onClearForm()
  }

  onClearForm(){
    this.editMode = false
    this.formEdit.onReset()
  }

  onRemoveItem(){
    this.slService.removeIngredient(this.editItemIndex)
    this.onClearForm()
  }

  ngOnDestroy() {
    this.subscriptionIndexEdit.unsubscribe()
  }

}
