import * as mongoose from "mongoose";

import { IRole } from "../interfaces/role";  //inherit from User interface
import { roleSchema } from "./schemas/role"; //defined user schema

const Role = mongoose.model<IRole>('Role', roleSchema);

export default Role;