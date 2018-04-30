import * as mongoose from 'mongoose';

import { IZone } from '../interfaces/zone';  // inherit from User interface
import { zoneSchema } from './schemas/zone'; // defined user schema

const Zone = mongoose.model<IZone>('Zone', zoneSchema);

export default Zone;
