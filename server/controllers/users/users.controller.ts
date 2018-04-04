import { MessageService } from './../../services/message/message';
import * as express from 'express';
import User from '../../models/user';
import Role from '../../models/role';
import { errorHandler } from '../../helpers/error';
import * as mongoose from 'mongoose';
import { auth } from '../auth/middleware/auth';

const users_router = express.Router();
const user_router = express.Router();
// define the home page route

// Get all users
users_router.get('/', auth.verifyToken_role(['admin', 'nlccoc' ]), (req, res) => {

  const promise = User.find({}, '_id email firstName lastName role profile isVerified role').populate('role').exec();
  promise.then(
    (result_users) => {
      res.status(200).json(result_users);
    },
    (err) => {
      errorHandler(err, res);
    });
});

// Get users waiting for approval for nlccoc
users_router.get('/waitingForApproval', auth.verifyToken_role(['admin']), (req, res) => {
  const promise = User.find({ isWaitingForApproval: true}).populate('role').exec();
  promise.then(
    (result_users) => {
      res.status(200).json(result_users);
    },
    (err) => {
      errorHandler(err, res);
    }
  );
});

user_router.get('/:userId', function (req, res) {
  // logger.debug('get user: ' + req.params.userId);
  User.findOne({_id: req.params.userId}, '_id email firstName lastName role profile isVerified', (err, user) => {

    if (err) {
      res.status(500).json({
        success: false
      });
    }
    res.status(200).json(user);
  });
});

user_router.put('/:userId', function(req, res) {
  const user = req.body;
  User.findOneAndUpdate({_id: user._id}, user, {new: true}, (err, q_user) => {
    if (err) {
      res.status(500);
    } else {
      delete q_user.salt;
      delete q_user.hash;
      res.status(200).json(q_user);
    }
  });
});

user_router.post('/:userId/submitNLCCOC', (req, res) => {
  const promise = User.findOneAndUpdate({ _id: req.params.userId}, { $set: {'isWaitingForApproval': true}}, { new: true}).exec();

  promise.then(
    (user) => {
      res.status(200).json(user);
    },
    (err) => {
      errorHandler(err, res);
      throw err;
    }
  );
});

user_router.put('/:userId/setRole', auth.verifyToken_role(['admin']), function(req, res) {
  // logger.debug(req.body);

  const promise = Role.findOne({ name: req.body['name']}).exec();

  promise.then(
    (role) => {
      if (role) {
        // logger.debug('role exists');
        // role exists
        const user_promise = User.findOne(
          { _id: req.params.userId }).populate('role').exec();

        user_promise.then(
          (user) => {
            if (user) {
              if (user.role.name !== 'admin') {
                user.role = role;
                if (role.name === 'nlccoc') {
                  user.isWaitingForApproval = false;
                }
                user.save((err) => {
                  if (err) { return errorHandler(err, res); }
                  res.status(200).json(user);
                  return;
                });
              } else {
                errorHandler('Admin can\'t be set to nlccoc member', res);
                return;
              }
            } else {
              errorHandler('User doesn\'t exist', res);
              return;
            }
          }
        ).catch(
          (err) => {
            errorHandler(err, res);
            throw err;
          }
        );
      } else {
        // role doesn't exist
        errorHandler('Role doesn\'t exist', res);
        return;
      }
    }
  ).catch(
    (err) => {
      errorHandler(err, res);
      throw err;
    }
  );
  return;
});

user_router.delete('/:userId', auth.verifyToken_role(['admin']), (req, res) => {
  const promise = User.findOneAndRemove({ _id: req.params.userId}).exec();

  promise.then(
    (user) => {
      res.status(200).json(user);
    },
    (err) => {
      errorHandler(err, res);
      throw err;
    }
  );
});

user_router.get('/:userId/messages', (req, res) => {
  const msgService = new MessageService();
  const promise = msgService.getMessagesByUserId(req.params.userId);

  promise.then(
    (messages) => {
      res.status(200).json(messages);
    },
    (err) => {
      errorHandler(err, res);
      throw err;
    }
  );
});

export let users = {
  users: users_router,
  user: user_router
};

