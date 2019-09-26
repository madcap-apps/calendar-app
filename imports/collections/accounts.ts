import { MongoObservable } from 'meteor-rxjs';
import { Account } from '@models/account';

export const Accounts = new MongoObservable.Collection<Account>('accounts');