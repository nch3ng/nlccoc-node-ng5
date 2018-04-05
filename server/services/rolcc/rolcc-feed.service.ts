import dotenv = require('dotenv');
import { RolccFeedModel } from '../../models/rolcc/rolcc-feed.model';
dotenv.config();
const { Client } = require('pg');

export class RolccFeedService {
  connectionString: string;

  constructor() { this.connectionString = process.env.POSTGRES_DATABASE_URL; }

  getTodayFeed(): Promise<RolccFeedModel> {
    return new Promise<RolccFeedModel>((resolve, reject) => {
      const client = new Client(this.connectionString + '?ssl=true');
      client.connect();

      const query = client.query( 'SELECT "rolcc_feeds".* FROM "rolcc_feeds" ORDER BY date DESC LIMIT 1;', (err, res) => {
        console.log(err ? err.stack : res.rows[0]);
        if (err) {
          reject(err.stack);
        } else {
          resolve(res.rows[0]);
        }
        client.end();
      });
    });
  }
  getAllFeeds(limit?: number): Promise<RolccFeedModel []> {
    return new Promise<RolccFeedModel []>((resolve, reject) => {
      const client = new Client(this.connectionString + '?ssl=true');
      client.connect();
      let str_limit = '';
      if (limit) {
        str_limit = 'LIMIT ' + +limit;
      }
      console.log(str_limit);

      const query = client.query( 'SELECT "rolcc_feeds".* FROM "rolcc_feeds" ORDER BY date DESC ' + str_limit + ';', (err, res) => {
        // console.log(err ? err.stack : res.rows);
        if (err) {
          reject(err.stack);
        } else {
          resolve(res.rows);
        }
        client.end();
      });
    });
  }
}
