import * as express from 'express';
import User  from '../../models/user';
import { UserService } from "../../services/user.service"

let users_router = express.Router();
let user_router = express.Router();
// define the home page route

users_router.get('/', function (req, res) {
  console.log("Get all users");
  // let q = UserService.findAll();
  // q.then((users) => {
  //   console.log(users);
  // })
  User.find({}, "_id email firstName lastName role profile", 
    (err, users) => {

      if(err) res.status(500).json({msg: "Error"})

      res.status(200).json(users);  
    });
});

user_router.get('/:userId', function (req, res) {
  console.log('get user: '+ req.params.userId);
  User.findOne({_id: req.params.userId}, "_id email firstName lastName role profile", (err, user) => {

    if(err) res.status(500).json({
      success: false
    })

    res.status(200).json(user);
  });
})

user_router.put('/:userId', function(req, res){
  const user = req.body;
  User.findOne({_id: user._id}, (err, q_user)=>{
    console.log(user);
    q_user.firstName = user.firstName; 
    q_user.lastName = user.lastName; 
    q_user.profile.fbLink = user.profile[0].fbLink;
    q_user.profile.linkedInLink = user.profile[0].linkedInLink;
    q_user.profile.twitterLink =user.profile[0].twitterLink;
    q_user.profile.instalLink =user.profile[0].instalLink;
    q_user.profile.cell =user.profile[0].cell;
    q_user.profile.address.address = user.profile[0].address[0].address;
    q_user.profile.address.city = user.profile[0].address[0].city;
    q_user.profile.address.state = user.profile[0].address[0].state;
    q_user.profile.address.postcode = user.profile[0].address[0].postcode;

    q_user.save(
      (err, user) => {
        console.log("done");
        res.status(200).json({user: user});
      }
    )
  })
});
//   User.findOneAndUpdate({_id: user._id}, {
//     firstName: user.firstName, 
//     lastName: user.lastName, 
//     profile: {
//       fbLink: user.profile[0].fbLink,
//       linkedInLink: user.profile[0].linkedInLink,
//       twitterLink: user.profile[0].twitterLink,
//       instalLink: user.profile[0].instalLink,
//       cell: user.profile[0].cell,
//       address: {
//         address: user.profile[0].address[0].address, 
//         city: user.profile[0].address[0].city,
//         state: user.profile[0].address[0].state,
//         postcode: user.profile[0].address[0].postcode
//       }
//     }
// }, {new: true}, (err, user) => {
//    //handle it
//     if(err){
//       console.log("Something wrong when updating data!");
//     }

//     console.log("done, updated user");
//     console.log(user);
//     res.status(200).json({user: user});

//   })
// }) 

export let users = {
  users: users_router,
  user: user_router
}
