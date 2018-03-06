import { PictureProfile } from './picture_profile';
export class Avatar {
  large: PictureProfile;
  normal: PictureProfile;

  constructor(){
    console.log("Construct Avatar");
    this.large = new PictureProfile();
    this.normal = new PictureProfile();
  }
}