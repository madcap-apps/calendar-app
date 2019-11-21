import { Register } from '@models/register.model';
import { Reset } from '@models/reset.model';

Meteor.methods({
  registerAccount(register: Register) {

    const userId = Accounts.createUser({
      username: register.Username,
      email: register.Email,
      password: register.Password,
      profile: register.Profile
    });

    Accounts.sendVerificationEmail(userId);
  },
  deleteAccount(userId: string) {
    Meteor.users.remove({ _id: userId });
  },
  sendResetPasswordLink(reset: Reset) {
    const user = Meteor.users.findOne({ username: reset.Username });
    Accounts.sendResetPasswordEmail(user._id, reset.Email);
  }
})