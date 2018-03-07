import * as mongoose from "mongoose";

import { IToken } from "../interfaces/token";  //inherit from Token interface
import { tokenSchema } from "./schemas/token"; //defined token schema

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;