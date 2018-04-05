"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
// console.log(process.env);
var Client = require('pg').Client;
var connectionString = process.env.POSTGRES_DATABASE_URL;
var client = new Client(connectionString + '?ssl=true');
client.connect();
var query = client.query('SELECT "rolcc_feeds".* FROM "rolcc_feeds" ORDER BY date DESC;', function (err, res) {
    console.log(err ? err.stack : res.rows[0]);
    client.end();
});
// query.on('end', () => { client.end(); });
