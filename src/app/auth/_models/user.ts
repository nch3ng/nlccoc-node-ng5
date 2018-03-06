import { Profile } from "./profile";

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profile: Profile;

  constructor(){
    this.email = 'johndoe@gmail.com';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.profile = new Profile();
  }
}
