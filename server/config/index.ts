import dotenv = require('dotenv');
dotenv.config();

export default class Config {
  private static _config: {[id: string]: {
    port: number,
    DBConnectionUrl: string,
    secret: string,
    expiry: number
  }};
  private static _env;
  
  static initialize() {
    this._env = process.env.NODE_ENV || "development";
    this._config = {
      "development": {
        port: 3000,
        DBConnectionUrl: "mongodb://" + process.env.DB_DEV_USERNAME + ":" + process.env.DB_DEV_PASSSWORD+ "@" + process.env.DB_DEV_ADDRESS + "/" + process.env.DB_DEV,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        expiry: 2 // In hours
      },
      "test": {
        port: 5000,
        DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_DEV_ADDRESS + "/" + process.env.DB_DEV,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        //mongodb: "mongodb://qnapadmin:qnap168qnap168@ds149934.mlab.com:49934/qnapusaauth",
        expiry: 2 // In hours
        //DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_TEST_ADDRESS + "/" + process.env.DB_TEST
      },
      "production": {
        port: process.env.PORT,
        DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_ADDRESS + "/" + process.env.DB,
        secret: "/mfA3uWl+1wKxpWn+TKRQyA67tgxQ60NAhv3WbqJK3M=",
        //mongodb: "mongodb://qnapadmin:qnap168qnap168@ds149934.mlab.com:49934/qnapusaauth",
        //DBConnectionUrl: "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSSWORD+ "@" + process.env.DB_ADDRESS + "/" + process.env.DB_PRODUCTION
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