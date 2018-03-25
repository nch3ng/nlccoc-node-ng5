import { PictureProfile } from './picture_profile';
export class Avatar {
  large: PictureProfile;
  normal: PictureProfile;

  constructor() {
    this.large = new PictureProfile();
    this.normal = new PictureProfile();
  }
}
