import * as express from 'express';
import * as mongoose from 'mongoose';
import Income from '../../models/income';
import { errorHandler } from '../../helpers/error';
import IncomeType from '../../models/income.type';

const income_router = express.Router();

// income_router.post('/', auth.verifyToken_role(['admin']), (req, res) => {
  income_router.post('/', (req, res) => {
  console.log('Post income');
  console.log(req.body);

  const incomeObj = new Income();
  incomeObj.amount = req.body.amount;
  // console.log(req.body.zone);
  incomeObj.zone = mongoose.Types.ObjectId(req.body.zone);
  incomeObj.date = req.body.date;
  incomeObj.type = mongoose.Types.ObjectId(req.body.type);
  // income.zone = mongoose.ObjectId(req.body.zone_id);
  // res.status(200).json({});
  incomeObj.save((err) => {
    if (err) {
      errorHandler(err, res);
    }
    // console.log(incomeObj);
    // res.status(200).json(incomeObj);
    const P = Income.findOne({_id: incomeObj._id }).populate('zone type').exec();
    P.then((populatedIncome) => {
      console.log(populatedIncome);
      res.status(200).json({
        success: true,
        income: populatedIncome
      });
    }).catch( error => errorHandler(error, res));
  });
});


income_router.get('/types', (req, res) => {
  console.log('Get income types');

  const promise = IncomeType.find({}).exec();

  promise.then(
    (types) => {
      res.status(200).json(types);
    }
  ).catch(err => errorHandler(err, res));
});

income_router.get('/:zoneId', (req, res) => {
  console.log('Get income ' + req.params.zoneId);
  res.status(200).json({});
});

income_router.get('/', (req, res) => {
  console.log('Get all income list');
  const promise = Income.find({}).populate('zone type').exec();
  promise.then((rIncome) => {
    res.status(200).json(rIncome);
  }).catch((err) => {
    errorHandler(err, res);
  });
});
income_router.get('/:zoneId/:month', (req, res) => {
  console.log('Get income ' + req.params.zoneId + ', month: ' + req.params.month);

  if (+req.params.month && +req.params.month > 0 && +req.params.month < 13) {
    res.status(200).json({});
  } else {
    res.status(500).json({});
  }
});

income_router.get('/:zoneId/:month/:type', (req, res) => {
  console.log('Get income ' + req.params.zoneId + ', month: ' + req.params.month, ', type: ' + req.params.type);

  if (+req.params.month && +req.params.month > 0 && +req.params.month < 13) {
    res.status(200).json({});
  } else {
    res.status(500).json({});
  }
});

export const income = income_router;
