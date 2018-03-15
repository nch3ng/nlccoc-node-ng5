import User from "../models/user"
export class UserService {
  static findAll() {
    return User.find({}, "_id email firstName lastName role profile");
  }
}