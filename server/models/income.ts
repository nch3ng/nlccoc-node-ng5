import * as mongoose from 'mongoose';

import { IIncome } from '../interfaces/income';  // inherit from User interface
import { incomeSchema } from './schemas/income'; // defined user schema

const Income = mongoose.model<IIncome>('Income', incomeSchema);

export default Income;
