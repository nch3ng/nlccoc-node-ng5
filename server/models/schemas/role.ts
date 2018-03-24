import * as mongoose from "mongoose";

export const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "normal"
  },
  remark: {
    type: String,
    default: ""
  }
})