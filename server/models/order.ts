import * as mongoose from 'mongoose';

import { IOrder } from './../interfaces/order';
import { orderSchema } from './schemas/order'; // defined user schema

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
