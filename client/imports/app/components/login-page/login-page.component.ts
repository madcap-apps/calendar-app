import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Accounts } from '@collections/accounts';

enum Navigation {
  Login,
  Register,
  Forgot
}

@Component({
  selector: 'mc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  Navigation = Navigation;

  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;
  forgotFormGroup: FormGroup;
  currentNavigation = Navigation.Login;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: [{}, Validators.required],
      password: [{}, Validators.required]
    });

    MeteorObservable.subscribe('accountList').subscribe(() => {
      const accounts = Accounts.find();
      console.log(`accounts: ${JSON.stringify(accounts)}`);
    })
  }

  onLogin() {
    console.log(`logging in - username: ${this.loginFormGroup.value.username}`);
  }

  onNavigateToRegistration() {
    console.log(`redirect to registration`);
    this.signupFormGroup = this.formBuilder.group({
      name: [{}, Validators.required],
      email: [{}, Validators.required],
      username: [{}, Validators.required],
      password: [{}, Validators.required]
    });
    this.currentNavigation = Navigation.Register;
  }

  onNavigateToLogin() {
    console.log(`redirect to login`);
    this.currentNavigation = Navigation.Login;
  }

  onNavigateToForgot() {
    console.log(`redirect to forgot password`);
    this.forgotFormGroup = this.formBuilder.group({
      email: [{}, Validators.required]
    });
    this.currentNavigation = Navigation.Forgot;
  }

  onForgotPassword() {
    console.log(`forgot password`);
  }

  onResetPassword() {

  }
}
