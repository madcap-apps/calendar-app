import { Meteor } from 'meteor/meteor';
import { Accounts } from '@collections/accounts';

Meteor.publish('accountList', function () {
  return Accounts.find({});
});
