import * as mongoose from "mongoose";
import * as crypto  from "crypto";
import * as jwt from "jsonwebtoken";
import Config from "../../config";
let config = Config.config;

export const orderSchema = new mongoose.Schema({
  createAt: {
    type: String,
    required: true,
    default: Date.now()
  },
  title: {
    type: String,
    required: true
  },
  partNumber: {
    type: String,
    required: true
  },
  customerId: {
    type: Number
  },
  amount: {
    type: Number,
    require: true
  }, 
  validThrough: {
    type: Date
  },
  paymentStatus: {
    type: String,
    require: true,
    default: 'unpaid'
  },
  status: {
    type: String,
    require: true,
    default: 'enabled'
  }
});