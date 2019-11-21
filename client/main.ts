import './imports/polyfills';
import { Meteor } from 'meteor/meteor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';
import { resetToken } from './imports/app/environment';

Accounts.onEmailVerificationLink((token, done) => {
  Accounts.verifyEmail(token, err => {
    if (err) {
      console.log(`email not verified: ${err}`);
    }
    done();
  });
});

Accounts.onResetPasswordLink((token, done) => {
  resetToken.Token = token;
  done();
});

Meteor.startup(() => {
  if (Meteor.isProduction) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule);
});
