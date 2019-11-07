import { AccountProfile } from '@models/account-profile.model';

export interface Register {
  Name: string;
  Email: string;
  Username: string;
  Password: string;
  Profile: AccountProfile;
}
