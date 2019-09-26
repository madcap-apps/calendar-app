import { NgModule } from '@angular/core';
import { LoginPageComponent } from 'client/imports/app/components/login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPageComponent],
  providers: [LoginPageComponent],
  bootstrap: [LoginPageComponent]
})
export class LoginPageModule { }
