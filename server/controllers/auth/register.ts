import { Profile } from './../../interfaces/profile';
import User from "../../models/user";
import * as crypto  from "crypto";
import Token from '../../models/token';

import secrets from '../../../src/secrets';

const sgMail = require('@sendgrid/mail');

export function register(req, res) {
  console.log(req.body);
  console.log("Registering user: " + req.body.email);
  var user = new User();
  console.log(user);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  User.findOne({'email' : user.email}, (err, user, done) => {
    if( err )
      return done(err);

    if( user ) {
      let content = {
        success: false,
        message: 'User alread exists'
      };
      res.send(content);
      return;
    }
  });

  user.setPassword(req.body.password);

  user.profile = new Profile();
  
  user.save(function(err) {
    
    const token = user.generateJwt();
    const email_token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
    email_token.save(
      (err) => {
        
        if (err) { return res.status(500).send({ msg: err.message }); }

        console.log(email_token);

        sgMail.setApiKey(secrets.sendgridKey);

        const msg = {
          to: 'boo0330@gmail.com',
          from: 'no-reply@expensetracker.com',
          subject: 'Thank you for signin up Expense Tracker',
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + email_token.token + '.\n',
          html: 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + email_token.token + '.\n'
        };
        sgMail.send(msg).then(
          () => {
            console.log("sent");
          }
        );

        res.status(200);
        res.json({
          "user": user,
          "success": true,
          "message": 'You created a new user',
          "token" : token
        });
      }
    )
  });
}