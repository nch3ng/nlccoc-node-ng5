import jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
import Config from '../../../config';
import * as logger from '../../../helpers/logger';

export const auth = {
  verifyToken: ( (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if ( token ) {
      jwt.verify(token, Config.config.secret, (err, decoded) => {

        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          if (!decoded['isVerified']) {
            return res.status(200).json({ success: false, verified: false, message: 'The user is not verified.' });
          }
          // all good, continue
          req.decoded = decoded;
          // logger.debug(decoded);
          next();
        }
      });

    } else {
      res.status(401).json({ success: false, message: 'No token exists.' });
    }
  }),
  verifyToken_role (roles) {
    return function(req, res, next) {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, Config.config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            if (!roles.includes(decoded.role)) {
              logger.debug('[' + decoded.role + '] does not belong to [' + roles + ']');
              return res.status(401).json({ success: false, verified: false, message: 'You are not authorized.' });
            }

            logger.debug('[' + decoded.role + '] belongs to [' + roles + ']');
            next();
          }
        });
      }
    };
  },
  verifyToken_unverified: ( (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, Config.config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // all good, continue
          req.decoded = decoded;
          next();
        }
      });
    }  else {
      res.status(401).json({ success: false, message: 'No token exists.' });
    }
  })
};
