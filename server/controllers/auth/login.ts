import User from "../../models/user";
import * as jwt from "jsonwebtoken";
import Config from "../../config";

import logger = require("../../helpers/logger");

export function login(req, res) {
  var reqUser = req.body;
  
  User.findOne({'email' : reqUser.email}, (err, user, done) => {
    let config = Config.config;
    logger.debug(user);
    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'User does not exists'
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

    
  
    
    
    let token = jwt.sign({
      userID: user._id,
      email: user.email,
      name: user.name
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
  })
}

export function fbLogin(req, res){
  //console.log(req.body);
  
  let user = new User();
  let token; 
  //console.log(req.body);
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.profile = req.body.profile;

  token = user.generateJwt();

  User.findOne({'email' : req.body.email}, (err, result_user, done) => {

    var config = Config.config;
    if( err )
      return done(err);

    if( !result_user ) {
      // The user does not exist
         
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
      res.status(200);
      res.json({
        "user": user,
        "success": true,
        "message": 'You successfully logged in.',
        "token" : token
      });
      return;
    }
  });
  
}