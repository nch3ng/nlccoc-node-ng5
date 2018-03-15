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
  cell: string;
  linkedInLink: string;
  twitterLink:string;
  instalLink: string;

  constructor(){
    this.fbAvatar = new Avatar();
    this.address = new Address();
    this.fbId="";
    this.fbCover="";
    this.fbToken="";
    this.fullName="";
    this.gender="N/A";
    this.locale="N/A";
    this.fbLink="";
    this.linkedInLink = "";
    this.twitterLink = "";
    this.instalLink = "";
    this.cell="";
  }
}