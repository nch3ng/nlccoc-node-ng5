import { Avatar } from './avatar';
import { Address } from './address';

export class Profile {
  fbId: string;
  fbCover: string;
  fbAvatar: Avatar;
  fbToken: string;
  fullName: string;
  gender: string;
  locale: string;
  fbLink: string;
  address: Address;

  constructor(){
    console.log("Construct Profile");
    this.fbAvatar = new Avatar();
    this.address = new Address();
  }
}