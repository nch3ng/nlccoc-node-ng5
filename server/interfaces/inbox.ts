import * as mongoose from 'mongoose';

export interface IInbox extends mongoose.Document {
  message?: String;
  to?: mongoose.Schema.Types.ObjectId;
  from?: mongoose.Schema.Types.ObjectId;
  sentAt?: Date;
  read: Boolean;
}
