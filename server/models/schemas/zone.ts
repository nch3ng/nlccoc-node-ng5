import * as mongoose from 'mongoose';

export const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'irvine'
  },
  address: {
    type: String,
    default: '1518 Brookhollow Dr., Santa Ana, 92705'
  }
});
