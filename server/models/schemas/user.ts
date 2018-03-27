import { Avatar } from './../../interfaces/avatar';
import * as mongoose from 'mongoose';
import * as logger from '../../helpers/logger';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import Config from '../../config';
import { Profile } from '../../interfaces/profile';
import Role from '../role';
const config = Config.config;

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  postcode: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
});
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
});

const avatarSchema = new mongoose.Schema({
  large: pictureProfileSchema,
  normal: pictureProfileSchema
});

const profileSchema = new mongoose.Schema({
  fbId: String,
  fbCover: String,
  fbAvatar: avatarSchema,
  fbToken: String,
  fullName: String,
  linkedInLink: {
    type: String,
    default: ''
  },
  twitterLink: {
    type: String,
    default: ''
  },
  instalLink: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  locale: {
    type: String,
    default: ''
  },
  fbLink: {
    type: String,
    default: ''
  },
  cell: {
    type: String,
    default: ''
  },
  occupation: {
    type: String,
    default: ''
  },
  organization: {
    type: String,
    default: ''
  },
  address: addressSchema
});

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
    type: mongoose.Schema.Types.ObjectId, ref: 'Role'
  },
  isNLCCSelected: {
    type: Boolean,
    default: false
  },
  isWaitingForApproval: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.isPasswordSet = function () {
  return this.salt ? true : false;
};

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1); // Expired in 1 day

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.firstName + ' ' + this.lastName,
    isVerified: this.isVerified,
    role: this.role['_id'],
    exp: Math.floor(expiry.getTime() / 1000),
  }, config.secret);
};

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.role) {
    Role.findOne({ name: 'normal'}, (err, role, done) => {
      if (err) {
        return done(err);
      }
      // logger.debug('presave');
      // logger.debug(role);
      const roleId = role['_id'];
      user.role = new mongoose.Types.ObjectId(roleId);
      // logger.debug(user.role);
      next();
    });
  } else {
    logger.debug('role is set');
    next();
  }
  // this.role = new mongoose.Types.ObjectId('5962a5f37bde228394da6f72')//this _id ref your model
});

userSchema.post('save', function (doc) {
  // logger.debug('this fired after a document was saved');
});

