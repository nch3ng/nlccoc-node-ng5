import { User } from './../auth/_models/user';

export class Report {
  name: string;
  path: string;
  month: number;
  year: number;
  uploadedAt: number;
  uploadedBy: User;
  remark: string;
  category: string;

  constructor() {
    this.name = '';
    this.path = '';
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.uploadedAt = Date.now();
    this.uploadedBy = null;
    this.remark = '';
    this.category = 'financial';
  }

  reset() {
    this.name = '';
    this.path = '';
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.uploadedAt = Date.now();
    this.uploadedBy = null;
    this.remark = '';
    this.category = 'financial';
  }
}
