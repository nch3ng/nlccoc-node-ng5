import * as mongoose from "mongoose";

export interface IToken extends mongoose.Document {
  _userId: mongoose.Schema.Types.ObjectId;
  token: String;
  createdAt: Date;
}