import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import AWS = require('aws-sdk');
import { Stream } from 'stream';

const filesCtrl = express.Router();

filesCtrl.post('/upload', function (req, res) {
  let fstream;
  req.pipe(req.busboy);
  let s3 = new AWS.S3();
  console.log("file upload");
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    
    if(process.env.NODE_ENV == 'dev') {
      // console.log('upload on dev');
      const filePath = path.join(__dirname, '../../../server/public/upload/', filename);
      fstream = fs.createWriteStream(filePath);

      file.pipe(fstream);

      file.on('data', function(data) {
        // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        // console.log('File [' + fieldname + '] Finished');
      });
      
      fstream.on('close', function () {
        console.log('Files saved');
        res.status(200).json({
          success: true,
          url:process.env.asset_host + '/upload/'+filename,
          message: 'Upload successfully'
        })
      });

    } else {
      const params = {
        Key: filename,
        Bucket: 'asset.nlccoc.org', //set somewhere
        Body: file, //req is a stream
      };

      s3.upload(params, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            msg: err
          });
        } else {
          res.status(200).json({
            success: true,
            url:process.env.asset_host + '/' + filename,
            message: 'Upload successfully'
          })
        }
      });
    }
  });
})

export default filesCtrl;