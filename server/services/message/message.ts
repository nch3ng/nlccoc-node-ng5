import { MessageModel } from '../../models/message';
import * as logger from '../../helpers/logger';
import Inbox from '../../models/inbox';

export class MessageService {
  private _msg: MessageModel;
  constructor(...args) {
    if (args) {
      this._msg = args[0];
    }
  }
  send(...args): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        logger.debug('Promise');
        let msg = new MessageModel();
        if (args) {
          msg = args[0];
        } else {
          msg = this._msg;
        }

        if ( !msg.to ) {
          reject('no recipent');
        } else {
          logger.debug('[in send]: send to ' + msg.to.email);
          const msgObj = new Inbox(msg);
          msgObj.save( function (err) {
            logger.debug(err);
            // saved
            logger.debug('[' + msgObj.message + '] was sent to [' + msgObj.to.email + '] from System Admin');
            resolve(true);
          });
        }
      }
    );
  }

  getMessagesByUserId(userId: number): Promise<MessageModel []> {
    return Inbox.find({to: userId}).sort({sentAt: 'desc'}).exec();
  }

  deleteMessagebyId(msgId: number) {
    return Inbox.remove({ _id: msgId}).exec();
  }

  read(msgId: number) {
    return Inbox.findOneAndUpdate({ _id: msgId }, { $set: { read: true } }, { new: true }).exec();
  }
  set msg(msg: MessageModel) {
    this._msg = msg;
  }
  get msg(): MessageModel {
    return this._msg;
  }

  set message(msg: string) {
    this.message = msg;
  }

  get message() {
    return this._msg.message;
  }
}
