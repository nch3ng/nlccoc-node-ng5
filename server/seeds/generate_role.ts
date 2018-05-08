import { roleSchema } from './../models/schemas/role';
import { IRole } from './../interfaces/role';
import Role from '../models/role';
import * as mongoose from 'mongoose';
import DataAccess from '../models/dataAccess';
import Config from '../config';
import * as logger from '../helpers/logger';
logger.debug('Seeding....');

class Seed {
  _config;
  conn;
  roles;
  constructor() {
    Config.initialize();

    this._config = Config.config;

    logger.debug(this._config);

    mongoose.connection.on('connected', () => {
      logger.debug('Mongoose connected to ' + this._config.DBConnectionUrl);
    });
    mongoose.connection.on('error', function(err) {
      logger.debug('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
      logger.debug('Mongoose disconnected');
    });
    // For app termination
    process.on('SIGINT', () => {
      this.gracefulShutdown('app termination', () => {
        process.exit(0);
      });
    });

    this.roles = [
      { name: 'admin', remark: 'adminiatration.' },
      { name: 'normal', remark: 'Just an normal account.' },
      { name: 'nlccoc', remark: 'Usually NLCCOC member.' },
      { name: 'media', remark: 'Member of multimedia team.' },
      { name: 'pastor', remark: 'Member of pastoral team.' }
    ];
    mongoose.connect(this._config.DBConnectionUrl, (err) => {
      this.conn = mongoose.connection;
      logger.debug(this._config.DBConnectionUrl);
    }).then(
      () => {
        this.generateRole();
        // this.conn.close();
      },
      (err) => {

      }
    );
  }

  gracefulShutdown (msg, callback): void {
    mongoose.connection.close(function() {
      logger.debug('Mongoose disconnected through ' + msg);
      callback();
    });
  }

  generateRole() {
    mongoose.connection.db.listCollections( { name: 'roles' } )
      .next( (err, collinfo) => {
        if (collinfo) {
          logger.debug('Collection: roles already exists');
          mongoose.connection.close();
        } else {
          for (const role of this.roles) {
            logger.debug(role);
            Role.create(role);
          }
        }
    });
  }
}

const seed = new Seed();



