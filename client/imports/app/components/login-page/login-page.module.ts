import { NgModule } from '@angular/core';
import { LoginPageComponent } from 'client/imports/app/components/login-page/login-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LoginPageComponent],
  providers: [LoginPageComponent],
  bootstrap: [LoginPageComponent]
})
export class LoginPageModule { }
