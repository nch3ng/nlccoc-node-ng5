import * as mongoose from 'mongoose';

export const inboxSchema = new mongoose.Schema({
  message: {
    type: String,
    default: ''
  },
  to: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    default: null
  },
  from: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    default: null
  },
  sentAt: {
    type: Date,
    default: Date.now()
  },
  read: {
    type: Boolean,
    default: false
  }
});
