
const sgMail = require('@sendgrid/mail');
import secrets from '../../../src/secrets';
import Token from '../../models/token';
import * as crypto from "crypto";

export function sendVerificationEmail(req, res) {
  console.log('Send Verification Email........');
  console.log(req.body);
  let user = req.body;
  const email_token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
  console.log(email_token);

  var options = {
    auth: {
      api_user: secrets.sendgridUsername,
      api_key: secrets.sendgridKey
    }
  }

  sgMail.setApiKey(secrets.sendgridKey);

  const msg = {
    to: 'boo0330@gmail.com',
    from: 'no-reply@expensetracker.com',
    subject: 'Thank you for signin up Expense Tracker',
    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + email_token.token + '.\n',
    html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + email_token.token + '.\n'
  };
  sgMail.send(msg).then(
    () => {
      console.log("sent");
    }
  );

  res.status(200).send({});
  // const email = {
  //   from: 'awesome@bar.com',
  //   to: 'boo0330@gmail.com',
  //   subject: 'Hello',
  //   text: 'Hello world',
  //   html: '<b>Hello world</b>'
  // };

  

  // client.sendMail(email, function(err, info){
  //   if (err){
  //     console.log(err);
  //   }
  //   else {
  //     console.log('Message sent: ' + info.response);
  //   }
  // });
}