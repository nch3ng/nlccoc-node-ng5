import { roleSchema } from './../models/schemas/role';
import { IRole } from './../interfaces/role';
import Role from "../models/role";
import * as mongoose from "mongoose";
import DataAccess from "../models/dataAccess";
import Config from "../config";
console.log("Seeding....");

class Seed {
  _config;
  conn;
  roles;
  
  
  constructor() {
    Config.initialize();

    this._config = Config.config;

    console.log(this._config);

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to ' + this._config.DBConnectionUrl);
    });
    mongoose.connection.on('error', function(err) {
      console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose disconnected');
    });
    
    // For app termination
    process.on('SIGINT', () => {
      this.gracefulShutdown('app termination', () => {
        process.exit(0);
      });
    });

    this.roles = [
      { name: "admin", remark: "adminiatration." },
      { name: "normal", remark: "Just an normal account." },
      { name: "nlccoc", remark: "Usually NLCCOC member." },
      { name: "media", remark: "Member of multimedia team." },
      { name: "pastor", remark: "Member of pastoral team." }
    ];
    
    mongoose.connect(this._config.DBConnectionUrl, { useMongoClient: true }, (err) => {
      this.conn = mongoose.connection;
      console.log(this._config.DBConnectionUrl);
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
      console.log('Mongoose disconnected through ' + msg);
      callback();
    });
  };

  generateRole() {
    mongoose.connection.db.listCollections( { name: 'roles' } )
      .next( (err, collinfo) => {
        if(collinfo) {
          console.log('Collection: roles already exists');
          mongoose.connection.close();
        } else {
          for( let role of this.roles) {
            console.log(role);
            Role.create(role);
          }
        }
    });
  }
}

const seed = new Seed();



