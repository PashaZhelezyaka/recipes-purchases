import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
