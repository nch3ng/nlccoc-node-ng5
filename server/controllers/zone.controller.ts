import * as express from 'express';
import Zone from '../models/zone';

export const zone = express.Router();

zone.get('/', (req, res) => {
  const promise = Zone.find({}).exec();
  promise.then(
    (zones) => {
      if (zones) {
        res.status(200).json(zones);
      }
    }
  ).catch( (err) => {
    res.status(500).json({});
  });
});


