
const sgMail = require('@sendgrid/mail');
import Token from '../../models/token';
import * as crypto from 'crypto';

export function sendVerificationEmail(req, res) {
  // console.log('Re-Send Verification Email........');
  // console.log(req.body);
  const user = req.body;
  const email_token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
  console.log(email_token);

  email_token.save(
    (err) => {
      // console.log('token saved');
      if (err) { return res.status(500).send({ msg: err.message }); }
      const options = {
        auth: {
          api_user: process.env.sendgridUsername,
          api_key: process.env.sendgridKey
        }
      };

      sgMail.setApiKey(process.env.sendgridKey);
      console.log('Sent to ' + user.email);

      const env = process.env.NODE_ENV || 'dev';
      const protocol = (env === 'dev' ? 'http' : 'https');
      const msg = {
        to: user.email,
        from: 'no-reply@expensetracker.com',
        subject: 'Thank you for signin up Expense Tracker',
        text: 'Hello,\n\n' +
              'Please verify your account by clicking the link: \n' +
              protocol + ':\/\/' + req.headers.host + '\/confirmation\/' +
              email_token.token + '?uid=' + user._id + '.\n',
        html: 'Hello,\n\n' +
              'Please verify your account by clicking the link: \n' +
              protocol + ':\/\/' + req.headers.host + '\/confirmation\/' +
              email_token.token + '?uid=' + user._id + '.\n'
      };
      sgMail.send(msg).then(
        () => {
          console.log('sent');
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
  });
}
