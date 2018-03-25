
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';

const server = require('./server');

const port = process.env.PORT || 3000;

const app = server.Server.bootstrap().app;

app.set('port', port);
const env = process.env.NODE_ENV || 'dev';

let key;
let cert;
if (env === 'dev') {
  // key = fs.readFileSync('encryption/app.nlccoc.org.key');
  // cert = fs.readFileSync( 'encryption/app.nlccoc.org.cer' );
} else {
  key = fs.readFileSync('/root/cert/app.nlccoc.org.key');
  cert = fs.readFileSync( '/root/cert/app.nlccoc.org.cer' );
}

const options = {
  key: key,
  cert: cert
};

if (env === 'dev') {
  const httpServer = http.createServer(app);
  httpServer.listen(port, (err: any) => {
    if (err) {
      return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
  });
} else {
  const httpsServer = https.createServer(options, app);
  httpsServer.listen(port, (err: any) => {
    if (err) {
      return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
  });
}
