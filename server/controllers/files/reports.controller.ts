
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import AWS = require('aws-sdk');
import { Stream } from 'stream';
import { auth } from "../auth/middleware/auth";
import Report from '../../models/report';
import { ResponseMessage } from '../../models/reponse-message';

export const reports = express.Router();

// Get all
reports.get('/', (req, res) => {
  let promise = Report.find({}).populate('uploadedBy').exec();
  
  promise.then(
    (reports)=>{
      res.status(200).json(reports);
    }
  ).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  )
})

// Create one
reports.post('/', auth.verifyToken, (req, res) => {
  const report = new Report(req.body);
  

  report.save(
    (err) => {
      if(err) return res.status(500).json({success: false, msg: err});
      return res.status(200).json(report);
    }
  );
})

//Delete one
reports.delete('/:reportId', auth.verifyToken, (req, res) => {
  console.log(req.params.reportId);
  Report.remove({ _id: req.params.reportId}, 
    (err) => {
      if (err) return res.status(500).json({success: false, msg: err});
      
      return res.status(200).json(new ResponseMessage(true, "Successfully Deleted"));
    })
})


// Get one by ID
reports.get('/:reportId', auth.verifyToken, (req, res) => {
  let promise = Report.findOne({ _id: req.params.reportId}).populate('uploadedBy').exec();

  promise.then(
    (report)=>{
      res.status(200).json(report);
    }
  ).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  )
})

reports.put('/:reportId', auth.verifyToken, (req, res) => {
  const report = new Report(req.body);
  let promise = Report.findOneAndUpdate({_id: report['_id']}, report, {new: true}).exec();
  
  promise.then(
    (qreport)=>{
      res.status(200).json(qreport);
    }
  ).catch(
    (err) => {
      console.log('error:', err);
      throw err;
    }
  )
})