import * as mongoose from 'mongoose';

export interface IZone extends mongoose.Document {
  name: String;
  address: String;
  createdAt: Date;
}
