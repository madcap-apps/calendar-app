import { Accounts } from '@collections/accounts'
import { Account } from '@models/account';

Meteor.methods({
  addAccount(account: Account){
    Accounts.insert(account);
  }
})