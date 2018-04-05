import * as express from 'express';
import logger = require('./helpers/logger');
import * as bodyParser from 'body-parser';
import User from './models/user';
import Config from './config';
import * as busboy from 'connect-busboy';

import { login as loginCtrl, fbLogin } from './controllers/auth/login';
import { register as registerCtrl } from './controllers/auth/register';
import { auth } from './controllers/auth/middleware/auth';
import { users as usersCtrl } from './controllers/users/users.controller';
import { orders as ordersCtrl, order as orderCtrl } from './controllers/orders/orders.controller';
import { sendVerificationEmail } from './controllers/auth/auth';
import Token from './models/token';
import filesCtrl from './controllers/files/files.controller';
import { reports as reportsCtrl, reports } from './controllers/files/reports.controller';
import { message as messageCtrl } from './controllers/messages/message.controller';
import rolcc from './controllers/rolcc.feeds/rolcc.feeds.controller';

const router = express.Router();

router.use(function timeLog (req, res, next) {
  logger.debug('Time: ', Date.now());
  next();
});
router.use(busboy());

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

router.post('/fbLogin', fbLogin);
router.get('/check-state', auth.verifyToken, (req, res) => {
  const content = {
    success: true,
    message: 'Successfully logged in'
  };
  res.send(content);
});

router.post('/sendVerificationEmail', auth.verifyToken_unverified, sendVerificationEmail);

router.post('/confirmation/:token', function (req, res) {
  logger.debug(req.params);

  Token.findOne({'token' : req.params.token}, (err, token, done) => {
    if (err) {
      return done(err);
    }
    if (!token) {
      logger.debug('token does not exist');
      res.status(200);
      res.json({
        'success': false,
        'message': 'The link is wrong'
      });
    } else {
      logger.debug('token exists');
      logger.silly(req.query.uid);
      const obj = JSON.stringify(token);

      if (req.query.uid === token._userId.toString()) {
        // logger.debug('Successfully validated');
        User.findOne({'_id' : token._userId.toString()}, (error, user, done_cb) => {
          if (user.isVerified) {
            res.status(200).json({
              'success': false,
              'message': 'Email is already verified'
            });
            token.remove();
          }
          user.isVerified = true;
          user.save(
            (usersaveerr) => {
              if (usersaveerr) { return res.status(500).send({ msg: err.message }); }

              res.status(200).json({
                'success': true,
                'message': 'Email verification succeed'
              });
              token.remove();
            }
          );
        });

        // token.remove();
      } else {
        logger.silly('Validation fail');
      }
    }
  });
});
router.use('/files', filesCtrl);
router.use('/user', auth.verifyToken, usersCtrl.user);
router.use('/users', auth.verifyToken, usersCtrl.users);
router.use('/orders', auth.verifyToken, ordersCtrl);
router.use('/order', auth.verifyToken, orderCtrl);
router.use('/reports', reportsCtrl);
router.use('/messages', messageCtrl);
router.use('/rolcc', rolcc);

export = router;
