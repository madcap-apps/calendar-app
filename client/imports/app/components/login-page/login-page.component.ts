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
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    MeteorObservable.subscribe('accountList').subscribe(() => {
      const accountObservable = Accounts.find();
      const accounts = accountObservable.fetch();
      console.log(`accounts: ${JSON.stringify(accounts)}`);
    });
  }

  onLogin() {
    console.log(`logging in - username: ${this.loginFormGroup.value.username}`);
  }

  onNavigateToRegistration() {
    console.log(`redirect to registration`);
    this.signupFormGroup = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
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
      email: [null, Validators.required]
    });
    this.currentNavigation = Navigation.Forgot;
  }

  onResetPassword() {
    console.log(`reset password`);
  }

  onRegister(){
    console.log(`name: ${this.signupFormGroup.value.name} - email: ${this.signupFormGroup.value.email} - username: ${this.signupFormGroup.value.username} - password: ${this.signupFormGroup.value.password}`);

    Meteor.call('sendEmail', 
      this.signupFormGroup.value.email,
      "madcap.software.community.service@gmail.com",
      "Example Email",
      "The contents of our email in plain text.",
    );

  }
}
