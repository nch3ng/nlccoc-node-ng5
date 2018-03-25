import User from "../../models/user";
import * as jwt from "jsonwebtoken";
import Config from "../../config";

import logger = require("../../helpers/logger");
import Role from "../../models/role";

export function login(req, res) {
  var reqUser = req.body;

  console.log(reqUser);
  const promise = User.findOne({'email' : reqUser.email}).populate('role').exec();
  promise.then(
    (user) => {
      
      if( !user ) {
        let content = {
          success: false,
          message: 'User does not exists'
        };
        res.status(401).send(content);
        return;
      }

      if( !user.isPasswordSet() ){
        let content = {
          success: false,
          message: 'Haven\'t set password yet'
        };
        res.status(401).send(content);
        return;
      }

      if( !user.validPassword(reqUser.password) ){
        let content = {
          success: false,
          message: 'Incorrect password'
        };
        res.status(401).send(content);
        return;
      }
      
      user.salt = "";
      user.hash = "";
      const config = Config.config;

      const token = jwt.sign({
        userID: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
      }, config.secret, {
        expiresIn : 60*60*config.expiry
      });
      
      let content = {
        user: user,
        success: true,
        message: 'You logged in',
        token: token
      };
      res.send(content);
    }).catch(
      (err) => {
        let content = {
          success: false,
          message: 'Opps something went wrong.....'
        }

        res.status(500).send(content);
      }
    );
}

export function fbLogin(req, res){
  //console.log(req.body);
  
  let user = new User();
  let token; 
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.profile = req.body.profile;

  

  const promise = User.findOne({'email' : req.body.email}).populate('role').exec();
  
  promise.then((result_user) => {

    var config = Config.config;

    if( !result_user ) {
      // The user does not exist
      user.isVerified = true;
      token = user.generateJwt();
      user.save(function(err) {
        //console.log(token);
        res.status(200);
        res.json({
          "user": user,
          "success": true,
          "message": 'You successfully signed up.',
          "token" : token
        });
      });
      return;
    } else {
      // The user exists
      // console.log('user exists');
      token = result_user.generateJwt();
      // console.log(result_user);
      res.status(200).json({
        "user": result_user,
        "success": true,
        "message": 'You successfully logged in.',
        "token" : token
      });
      return;
    }
  }).catch( (err) => {
    console.log('error:', err);
    res.status(200).send(
      {
        success: false,
        message: "Something went wrong..."
      }
    );
  });
  
}