
import * as https from "https";
import * as http from "http";
import * as fs from 'fs';

let server = require("./server");

const port = process.env.PORT || 3000;

let app = server.Server.bootstrap().app;

app.set("port", port);
let env = process.env.NODE_ENV || 'dev';

console.log(env);
let key;
let cert;
if(env == "dev"){
  // key = fs.readFileSync('encryption/app.nlccoc.org.key');
  // cert = fs.readFileSync( 'encryption/app.nlccoc.org.cer' );
} else {
  key = fs.readFileSync('/root/cert/app.nlccoc.org.key');
  cert = fs.readFileSync( '/root/cert/app.nlccoc.org.cer' );
  
}

let options = {
  key: key,
  cert: cert
}
if(env == "dev"){
  let httpServer = http.createServer(app);
  httpServer.listen(port, (err:any) => {
    if (err) {
      return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
  })
} else {
  let httpsServer = https.createServer(options, app);
  httpsServer.listen(port, (err:any) => {
    if (err) {
      return console.log(err)
    }
  
    return console.log(`server is listening on ${port}`)
  })
}
