import { Role } from './role';
import { Profile } from "./profile";

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profile: Profile;
  token: string;
  isVerified: boolean;
  role: Role;

  constructor(){
    this.email = 'johndoe@gmail.com';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.profile = new Profile();
  }
}
