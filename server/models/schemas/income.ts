import * as mongoose from 'mongoose';

export const incomeSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId, ref: 'IncomeType'
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Zone'
  },
  date: {
    type: Date,
    default: ''
  },
  amount: {
    type: Number,
    default: ''
  },
});
