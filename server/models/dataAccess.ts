import * as mongoose from 'mongoose';
import * as logger from '../helpers/logger';
import dotenv = require('dotenv');
import Config from '../config';


class DataAccess {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  static gracefulShutdown (msg, callback): void {
    mongoose.connection.close(function() {
      logger.debug('Mongoose disconnected through ' + msg);
      callback();
    });
  }

  static connect(): mongoose.Connection {
    // use q promises
    global.Promise = require('q').Promise;
    mongoose.Promise = global.Promise;
    // logger.debug(Config.config);
    const MONGODB_CONNECTION: string = Config.config.DBConnectionUrl;

    if (this.mongooseInstance) { return this.mongooseInstance; }

    this.mongooseConnection = mongoose.connection;

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function() {
      logger.debug('Mongoose connected to ' + MONGODB_CONNECTION);
    });
    mongoose.connection.on('error', function(err) {
      logger.debug('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
      logger.debug('Mongoose disconnected');
    });
    // this.mongooseConnection.once('open', () => {
    //   logger.debug('Connected to mongodb');
    // })
    // For nodemon restarts
    process.once('SIGUSR2', () => {
      this.gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });
    // For app termination
    process.on('SIGINT', () => {
      this.gracefulShutdown('app termination', () => {
        process.exit(0);
      });
    });
    // For Heroku app termination
    process.on('SIGTERM', function() {
      this.gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
      });
    });
    this.mongooseInstance = mongoose.connect(MONGODB_CONNECTION, {
      useMongoClient: true
    });
    return this.mongooseInstance;
  }
}

// DataAccess.connect();
export default DataAccess;
