import * as mongoose from 'mongoose';

export const incomeTypeSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
