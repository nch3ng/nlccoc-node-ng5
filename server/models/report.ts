import { IReport } from './../interfaces/report';
import * as mongoose from 'mongoose';

import { reportSchema } from './schemas/report';

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
