import { Avatar } from './../../interfaces/avatar';
import * as mongoose from "mongoose";
import * as crypto  from "crypto";
import * as jwt from "jsonwebtoken";
import Config from "../../config";
import { Profile } from "../../interfaces/profile";
let config = Config.config;

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  postcode: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
})
const pictureProfileSchema = new mongoose.Schema({
  height: {
    type: Number,
    default: 500
  },
  width: {
    type: Number,
    default: 500
  }, 
  path: {
    type: String,
    default: './assets/app/media/img/users/male-avatar.png'
  }
})

const avatarSchema = new mongoose.Schema({
  large: pictureProfileSchema,
  normal: pictureProfileSchema
})

const profileSchema = new mongoose.Schema({
  fbId: String,
  fbCover: String,
  fbAvatar: avatarSchema,
  fbToken: String,
  fullName: String,
  linkedInLink: {
    type: String,
    default: ""
  },
  twitterLink: {
    type: String,
    default: ""
  },
  instalLink: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  locale: {
    type: String,
    default: ""
  },
  fbLink: {
    type: String,
    default: ""
  },
  cell: {
    type: String,
    default: ""
  },
  occupation: {
    type: String,
    default: ""
  },
  organization: {
    type: String,
    default: ""
  },
  address: addressSchema
})

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  profile: profileSchema,
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  role: {
    type: String, 
    default: 'normal'
  }
  // role: {
  //   type: mongoose.Schema.Types.ObjectId, ref: 'Role'
  // },
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1); // Expired in 1 day

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.firstName + ' ' + this.lastName,
    isVerified: this.isVerified,
    exp: Math.floor(expiry.getTime() / 1000),
  }, config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.methods.findAll = () => {
  return this.find({}, "_id email firstName lastName role profile");
}