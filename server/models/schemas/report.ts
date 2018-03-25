import * as mongoose from 'mongoose';

export const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'financial'
  },
  path: {
    type: String,
    default: ''
  },
  month: {
  },
  uploadedAt: {
    type: Number,
    default: Date.now()
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  remark: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'financial'
  }
});


