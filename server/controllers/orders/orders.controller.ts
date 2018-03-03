import { Router } from '@angular/router';
import * as express from 'express';
import Order from "../../models/order";

let orders_router = express.Router();
let order_router = express.Router();


// define the home page route
orders_router.get('/', function (req, res) {

  let promise = Order.find({}).exec();
  promise.then(
    (orders)=>{
      console.log(orders);
      let content = {
        success: true,
        orders: orders,
        message: 'All orders'
      };
      res.status(200);
      res.json(content);
  }).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  );

  // Order.find({}, function(err, allOrders) {
  //   if (err) {
  //     console.log(err)
  //     throw err;
  //   }
  //   orders = allOrders
  //   console.log(orders);
  //   let content = {
  //     success: true,
  //     orders: orders,
  //     message: 'All orders'
  //   };
  //   res.status(200);
  //   res.json(content);
  // }).then(
  //   () => {
  //     // console.log(orders);
  //     // let content = {
  //     //   success: true,
  //     //   orders: orders,
  //     //   message: 'All orders'
  //     // };
  //     // res.status(200);
  //     // res.json(content);
  //   })
})

order_router.get('/:orderId', function (req, res) {
  let order = Order.findOne({'id': req.params.orderId}, (err, user, done) => {

  });
  res.status(200);
  res.json({
    "order": order,
    "success": true,
    "message": 'Get order successfully'
  });
})

order_router.post('/', function (req, res) {
  let order = new Order();
  
  order.title = req.body.title;
  order.amount = req.body.amount;
  order.partNumber = req.body.partNumber;
  
  console.log(order);
  if (!req.body) return res.sendStatus(400)
  
  order.save((err) => {
  
    if(err) {
      res.status(500);
      res.json({
        "order": order,
        "success": false,
        "message": err
      });

    } else {
      res.status(200);
      res.json({
        "order": order,
        "success": true,
        "message": 'You created a new order'
      });
  }
  });
})

module.exports = {
  orders: orders_router,
  order: order_router
}
