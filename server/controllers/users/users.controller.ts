import { Message } from 'primeng/primeng';

import * as express from 'express';
import User from '../../models/user';

let users_router = express.Router();
let user_router = express.Router();
// define the home page route
users_router.get('/', function (req, res) {
  console.log("Get all users");
  User.find({}, "_id email firstName lastName role profile", 
    (err, users) => {

      if(err) res.status(500).json({msg: "Error"})

      res.status(200).json(users);  
    });
});




user_router.get('/:userId', function (req, res) {
  res.send('get user: '+ req.params.userId);
})

export var users = {
  users: users_router,
  user: user_router
}
