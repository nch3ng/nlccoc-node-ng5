import { Profile } from './../../interfaces/profile';
import User from "../../models/user";

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
    var token;
    token = user.generateJwt();
    //console.log(token);
    res.status(200);
    res.json({
      "user": user,
      "success": true,
      "message": 'You created a new user',
      "token" : token
    });
  });
}