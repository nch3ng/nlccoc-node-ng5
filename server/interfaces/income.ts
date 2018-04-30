import * as mongoose from 'mongoose';

export interface IIncome extends mongoose.Document {
  type: mongoose.Schema.Types.ObjectId;
  zone: mongoose.Schema.Types.ObjectId;
  date: Date;
  amount: Number;
}
