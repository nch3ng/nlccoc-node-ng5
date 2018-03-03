import * as mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  createAt?: Date;
  title?: String;
  amount?: Number;
  partNumber?: String;
  customerId?: Number;
  validThrough?: Date;
};