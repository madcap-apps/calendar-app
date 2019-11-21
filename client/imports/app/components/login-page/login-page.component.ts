import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Register } from '@models/register.model';
import { AccountProfile } from '@models/account-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Reset } from '@models/reset.model';
import { resetToken } from './../../environment';

enum Navigation {
  Login,
  Register,
  Forgot,
  Reset
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
  resetFormGroup: FormGroup;
  currentNavigation = Navigation.Login;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    // MeteorObservable.subscribe('userList').subscribe(() => {
    //   const uesrsObs = Meteor.users.find();
    //   const users = uesrsObs.fetch();
    //   console.log(`users: ${JSON.stringify(users)}`);
    // });

    if (resetToken.Token && resetToken.Token.length > 0) {
      console.log(`redirect to reset password - reset token detected`);
      this.resetFormGroup = this.formBuilder.group({
        password1: [null, Validators.required],
        password2: [null, Validators.required]
      });
      this.currentNavigation = Navigation.Reset;
    }
  }

  onLogin() {
    console.log(`logging in - username: ${this.loginFormGroup.value.username}`);
    Meteor.loginWithPassword(
      this.loginFormGroup.value.username,
      this.loginFormGroup.value.password,
      err => {
        if (err) {
          console.log(`error logging in: ${err}`);
        } else {
          console.log(`logged in user: ${JSON.stringify(Meteor.user())}`);
          this.ngZone.run(() => this.router.navigate([`../calendar`], { relativeTo: this.route })).then();
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
      username: [null, Validators.required],
      email: [null, Validators.required]
    });
    this.currentNavigation = Navigation.Forgot;
  }

  onSendResetPasswordLink() {
    console.log(`reset password`);
    console.log(`username: ${this.forgotFormGroup.value.username} -
      email: ${this.forgotFormGroup.value.email}`);

    const reset = <Reset>{
      Username: this.forgotFormGroup.value.username,
      Email: this.forgotFormGroup.value.email
    }

    Meteor.call('sendResetPasswordLink', reset, err => {
      if (err) {
        console.log(`error sending reset password email: ${err}`);
      }
    });
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
      if (err) {
        console.log(`error registering account: ${err}`);
      }
    });
  }

  onResetPassword() {
    const password1 = this.resetFormGroup.value.password1;
    const password2 = this.resetFormGroup.value.password2;
    if (password1 && password1.length > 0 && password1 === password2) {
      Accounts.resetPassword(resetToken.Token, password1, err => {
        if (err) {
          console.log(`error resetting password: ${err}`);
        } else {
          this.currentNavigation = Navigation.Login;
          resetToken.Token = null;
        }
      });
    } else {
      console.log(`passwords are not equal - p1: ${password1} - p2: ${password2}`);
    }
  }
}
