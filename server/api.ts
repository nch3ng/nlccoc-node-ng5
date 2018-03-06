import * as express from 'express';
import logger = require("./helpers/logger");
import * as bodyParser from 'body-parser';
import User from "./models/user";
import Config from "./config";

import { login as loginCtrl, fbLogin } from "./controllers/auth/login";
import { register as registerCtrl } from './controllers/auth/register';
import { auth } from "./controllers/auth/middleware/auth";
import { users as usersCtrl } from "./controllers/users/users.controller";
import { orders as ordersCtrl, order as orderCtrl } from "./controllers/orders/orders.controller";
let router = express.Router();
// let auth = require("./controllers/auth/middleware/auth");

// let registerCtrl = require("./controllers/auth/register");
// let loginCtrl = require("./controllers/auth/login");
// let usersCtrl = require("./controllers/users/users.controller");
// let ordersCtrl = require("./controllers/orders/orders.controller");

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

router.post('/fbLogin', fbLogin);
router.get('/check-state', auth.verifyToken, (req, res) => {
  let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);
});

router.use('/user', auth.verifyToken, usersCtrl.user);
router.use('/users', auth.verifyToken, usersCtrl.users);
router.use('/orders', auth.verifyToken, ordersCtrl);
router.use('/order', auth.verifyToken, orderCtrl);

export = router;