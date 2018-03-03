import * as express from 'express';
import logger = require("./helpers/logger");
import * as bodyParser from 'body-parser';

let router = express.Router();
let auth = require("./controllers/auth/middleware/auth");

let registerCtrl = require("./controllers/auth/register");
let loginCtrl = require("./controllers/auth/login");
let usersCtrl = require("./controllers/users/users.controller");
let ordersCtrl = require("./controllers/orders/orders.controller");

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);
router.get('/check-state', auth.verifyToken, (req, res) => {
  logger.debug("check-state");
  let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);
});

router.use('/user', auth.verifyToken, usersCtrl.user);
router.use('/users', auth.verifyToken, usersCtrl.users);
router.use('/orders', auth.verifyToken, ordersCtrl.orders);
router.use('/order', auth.verifyToken, ordersCtrl.order);

module.exports = router;