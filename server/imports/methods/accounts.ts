import { Register } from '@models/register.model';

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
    Meteor.users.remove({_id: userId});
  }
})