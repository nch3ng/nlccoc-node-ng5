export class PictureProfile {
  height: number;
  width: number;
  path: string;
  constructor(){
    console.log("Construct Picture Profile");
    this.path = './assets/app/media/img/users/user4.jpg';
  }
}