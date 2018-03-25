import * as mongoose from 'mongoose';
import { Profile } from './profile';

export interface IUser extends mongoose.Document {
  email?: String;
  firstName?: String;
  lastName?: String;
  passwordCreated?: Boolean;
  hash?: String;
  salt?: String;
  profile: Profile;
  status: String;
  isVerified: Boolean;
  role: String;
}
