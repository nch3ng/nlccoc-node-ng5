import * as express from 'express';
import User  from '../../models/user';

let users_router = express.Router();
let user_router = express.Router();
// define the home page route

users_router.get('/', function (req, res) {
  // console.log("Get all users");
  // let q = UserService.findAll();
  // q.then((users) => {
  //   console.log(users);
  // })
  User.find({}, "_id email firstName lastName role profile isVerified", 
    (err, users) => {

      if(err) res.status(500).json({msg: "Error"})

      res.status(200).json(users);  
    });
});

user_router.get('/:userId', function (req, res) {
  console.log('get user: '+ req.params.userId);
  User.findOne({_id: req.params.userId}, "_id email firstName lastName role profile isVerified", (err, user) => {

    if(err) res.status(500).json({
      success: false
    })

    res.status(200).json(user);
  });
})

user_router.put('/:userId', function(req, res){
  const user = req.body;
    
  User.findOneAndUpdate({_id: user._id}, user, {new: true}, (err, q_user) => {
    if (err) {
      res.status(500);
    } else {
      delete q_user.salt;
      delete q_user.hash;
      res.status(200).json(q_user);
    }
  })
});

export let users = {
  users: users_router,
  user: user_router
}
