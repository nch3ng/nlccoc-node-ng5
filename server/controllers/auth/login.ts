import User from '../../models/user';
import * as jwt from 'jsonwebtoken';
import Config from '../../config';

import logger = require('../../helpers/logger');
import Role from '../../models/role';

export function login(req, res) {
  const reqUser = req.body;

  // logger.debug(reqUser);
  const promise = User.findOne({'email' : reqUser.email}).populate('role').exec();
  promise.then(
    (user) => {
      if (!user) {
        const res_content = {
          success: false,
          message: 'User does not exists'
        };
        res.status(401).send(res_content);
        return;
      }

      if (!user.isPasswordSet()) {
        const res_content = {
          success: false,
          message: 'Haven\'t set password yet'
        };
        res.status(401).send(res_content);
        return;
      }

      if (!user.validPassword(reqUser.password)) {
        const res_content = {
          success: false,
          message: 'Incorrect password'
        };
        res.status(401).send(res_content);
        return;
      }
      user.salt = '';
      user.hash = '';
      const config = Config.config;

      const token = jwt.sign({
        userID: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        role: user.role.name
      }, config.secret, {
        expiresIn : 60 * 60 * config.expiry
      });
      const content = {
        user: user,
        success: true,
        message: 'You logged in',
        token: token
      };
      res.send(content);
    }).catch(
      (err) => {
        const content = {
          success: false,
          message: 'Opps something went wrong.....'
        };

        res.status(500).send(content);
      }
    );
}

export function fbLogin(req, res) {
  // logger.debug(req.body);
  console.log('fbLogin');
  const user = new User();
  let token;
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.profile = req.body.profile;

  const promise = User.findOne({'email' : req.body.email}).populate('role').exec();
  promise.then((result_user) => {

    const config = Config.config;
    if (!result_user) {
      // The user does not exist
      user.isVerified = true;
      token = user.generateJwt();
      return user.save(function(err) {
        // logger.debug(token);
        res.status(200);
        res.json({
          'user': user,
          'success': true,
          'message': 'You successfully signed up.',
          'token' : token
        });
      });
    } else {
      // The user exists
      // logger.debug('user exists');
      token = result_user.generateJwt();
      // logger.debug(result_user);
      res.status(200).json({
        'user': result_user,
        'success': true,
        'message': 'You successfully logged in.',
        'token' : token
      });
      return;
    }
  }).catch( (error) => {
    // logger.debug('error:', err);
    res.status(200).json({
      'success': false,
      'message': 'Oops! Something went wrong.'
    });
  });
}
