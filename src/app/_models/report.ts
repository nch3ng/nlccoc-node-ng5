import { User } from './../auth/_models/user';

export class Report {
  name: string;
  path: string;
  month: number;
  uploadedAt: number;
  uploadedBy: User;
  remark: string;
  category: string;

  constructor(){
    this.name = "";
    this.path = "";
    this.month = 1;
    this.uploadedAt = Date.now();
    this.uploadedBy = null
    this.remark = "";
    this.category = "financial";
  }

  reset() {
    this.name = "";
    this.path = "";
    this.month = 1;
    this.uploadedAt = Date.now();
    this.uploadedBy = null;
    this.remark = "";
    this.category = "financial";
  }
}