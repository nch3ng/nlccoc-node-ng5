import * as mongoose from 'mongoose';

import { IInbox } from '../interfaces/inbox';  // inherit from Inbox interface
import { inboxSchema } from './schemas/inbox'; // defined Inbox schema

const Inbox = mongoose.model<IInbox>('Inbox', inboxSchema);

export default Inbox;
