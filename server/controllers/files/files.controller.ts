import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import AWS = require('aws-sdk');
import { Stream } from 'stream';

const filesCtrl = express.Router();

async function uploadReadableStream(stream) {
  let s3 = new AWS.S3();
  const params = {Bucket: 'asset.nlccoc.org', Key: "Avo37PttnB7fZn0tPCOee6qlylVT9yeUMYUYYkG1", Body: stream};
  return s3.upload(params).promise();
}

filesCtrl.post('/upload', function (req, res) {
  let fstream;
  req.pipe(req.busboy);
  let s3 = new AWS.S3();

  req.busboy.on('file', function (fieldname, file, filename) {
    
    // const filePath = path.join(__dirname, '../../../public/upload/', filename);
    // fstream = fs.createWriteStream(filePath);

    const params = {
      Key: "test.jpg",
      Bucket: 'files.natecheng.me', //set somewhere
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
          message: 'Upload successfully'
        })
      }
    });
    // file.pipe(fstream);
    // fstream.on('close', function () {
    //   console.log('Files saved');
    //   res.status(200).json({
    //     success: true,
    //     message: 'Upload successfully'
    //   })
    // });
  });
})

export default filesCtrl;