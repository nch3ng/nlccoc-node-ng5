import * as mongoose from "mongoose";

export interface IReport extends mongoose.Document {
  name?: String,
  path?: String,
  uploadedAt?: Date,
  uploadedBy?: Number,
  remark?: string,
  category?: string
};