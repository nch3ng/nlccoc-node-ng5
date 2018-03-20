import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import AWS = require('aws-sdk');
import { Stream } from 'stream';
import { auth } from "../auth/middleware/auth";
import Report from '../../models/report';

export const reports = express.Router();

reports.get('/', (req, res) => {
  let promise = Report.find({}).populate('uploadedBy').exec();
  
  promise.then(
    (reports)=>{
      console.log(reports);
      res.status(200).json(reports);
    }
  ).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  )
})

reports.post('/', auth.verifyToken, (req, res) => {
  const report = new Report(req.body);
  console.log(report);

  report.save(
    (err) => {
      if(err) return res.status(500).json({success: false, msg: err});
      return res.status(200).json(report);
    }
  );
})