import dotenv = require('dotenv');
dotenv.config();

// console.log(process.env);
const { Client } = require('pg');

const connectionString = process.env.POSTGRES_DATABASE_URL;

const client = new Client(connectionString + '?ssl=true');
client.connect();

const query = client.query( 'SELECT "rolcc_feeds".* FROM "rolcc_feeds" ORDER BY date DESC;', (err, res) => {
    console.log(err ? err.stack : res.rows[0]);
    client.end();
  });
