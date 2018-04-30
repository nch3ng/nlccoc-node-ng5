import * as mongoose from 'mongoose';

export interface IIncomeType extends mongoose.Document {
  name: String;
}
