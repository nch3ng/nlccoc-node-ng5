import dotenv = require('dotenv');
dotenv.config();

export default class Config {
  private static _config: {[name: string]: {
    port: number,
    DBConnectionUrl: string,
    secret: string,
    expiry: number
  }};
  private static _env;
  
  static initialize() {
    this._env = process.env.NODE_ENV || "dev";
    this._config = {
      "dev": {
        port: 3000,
        DBConnectionUrl: "mongodb://" + process.env.DB_DEV_USERNAME + ":" + process.env.DB_DEV_PASSSWORD+ "@" + process.env.DB_DEV_ADDRESS + "/" + process.env.DB_DEV,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        expiry: 2 // In hours
      },
      "test": {
        port: 5000,
        DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_DEV_ADDRESS + "/" + process.env.DB_DEV,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        expiry: 2 // In hours
      },
      "production": {
        port: +process.env.PORT,
        DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_ADDRESS + "/" + process.env.DB,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        expiry: 24
      } 
    }
  }

  static get config(){
    return this._config[this._env];
  }

  static get env() {
    return this._env;
  }
}