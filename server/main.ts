import './imports/methods/todos';
import './imports/methods/accounts';
import './imports/methods/email';

import './imports/publications/todos';
import './imports/publications/accounts';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  if (Meteor.isServer) {
    process.env.MAIL_URL = "smtps://madcap.software.community.service%40gmail.com:EnWEGejW9384Fe@smtp.gmail.com:465";
  }
});