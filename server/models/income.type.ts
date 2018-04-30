import * as mongoose from 'mongoose';

import { IIncomeType } from '../interfaces/income.type';  // inherit from IncomeType interface
import { incomeTypeSchema } from './schemas/income.type'; // defined IncomeType schema

const IncomeType = mongoose.model<IIncomeType>('IncomeType', incomeTypeSchema);

export default IncomeType;
