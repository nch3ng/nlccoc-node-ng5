import * as mongoose from "mongoose";
import { Profile } from "./profile";

export interface IUser extends mongoose.Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  passwordCreated?: boolean;
  hash?: String;
  salt?: String;
  profile: Profile;
  status: String;
  isVerified: Boolean;
  role: string;
};