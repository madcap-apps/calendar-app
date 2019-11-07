import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Register } from '@models/register.model';
import { AccountProfile } from '@models/account-profile.model';

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

    MeteorObservable.subscribe('userList').subscribe(() => {
      const uesrsObs = Meteor.users.find();
      const users = uesrsObs.fetch();
      console.log(`users: ${JSON.stringify(users)}`);
    });
  }

  onLogin() {
    console.log(`logging in - username: ${this.loginFormGroup.value.username}`);
    Meteor.loginWithPassword(
      this.loginFormGroup.value.username,
      this.loginFormGroup.value.password,
      err => {
        if (!err) {
          console.log(`error logging in: ${err}`);
        } else {
          console.log(`logged in`);
        }
      });
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

  onRegister() {

    console.log(`name: ${this.signupFormGroup.value.name} -
     email: ${this.signupFormGroup.value.email} - 
     username: ${this.signupFormGroup.value.username} - 
     password: ${this.signupFormGroup.value.password}`);

    var profile = <AccountProfile>{
      Name: this.signupFormGroup.value.name
    };

    var register = <Register>{
      Name: this.signupFormGroup.value.name,
      Email: this.signupFormGroup.value.email,
      Username: this.signupFormGroup.value.username,
      Password: this.signupFormGroup.value.password,
      Profile: profile
    };

    Meteor.call('registerAccount', register, err => {
      if (!err) {
        console.log(`error registering account: ${err}`);
      }
    });
  }
}
