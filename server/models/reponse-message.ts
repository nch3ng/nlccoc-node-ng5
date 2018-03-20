import { IResponseMessage } from './../interfaces/response-message/responseMessage';
export class ResponseMessage implements IResponseMessage {
  constructor(success: boolean, msg: any){
  }
}