export class Address {
  address: string;
  city: string;
  postcode: string;
  constructor() {
    console.log("construct address");
    this.address="";
    this.city="";
    this.postcode="";
  }
}