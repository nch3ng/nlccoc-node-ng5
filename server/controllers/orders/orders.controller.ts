import { Router } from '@angular/router';
import * as express from 'express';
import Order from '../../models/order';

const orders_router = express.Router();
const order_router = express.Router();


// define the home page route
orders_router.get('/', function (req, res) {

  const promise = Order.find({}).exec();
  promise.then(
    (result_orders) => {
      console.log(result_orders);
      const content = {
        success: true,
        orders: result_orders,
        message: 'All orders'
      };
      res.status(200).json(content);
  }).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  );
});

order_router.get('/:orderId', function (req, res) {
  // No use
});

order_router.post('/', function (req, res) {
  // No use
});

export const orders = orders_router;
export const order = order_router;
