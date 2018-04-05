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
  linkedInLink: string;
  twitterLink: string;
  instalLink: string;
  address: Address;
  organization: string;
  occupation: string;
  cell: string;

  constructor() {
    this.fbAvatar = new Avatar();
    this.address = new Address();
    this.occupation = '';
    this.organization = '';
  }
}
