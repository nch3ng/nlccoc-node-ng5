import { MessageService } from '../../services/message/message';
import * as express from 'express';
import * as logger from '../../helpers/logger';
import User from '../../models/user';
import { MessageModel } from '../../models/message';
import { errorHandler } from '../../helpers/error';

const message_router = express.Router();

message_router.post('/', (req, res) => {
  logger.debug(req.body);
  const messageService = new MessageService(req.body);
  messageService.send();
  res.status(200).json({});
});

message_router.post('/all', (req, res) => {

  logger.debug('send message to all');

  // logger.debug(req.body);
  // if (!req.body.from) {
  //   return errorHandler('No sender', res);
  // }

  const promise = User.find({}).exec();
  promise.then(
    (result_users) => {
      // logger.debug(result_users);
      for (const user of result_users) {
        const msg: MessageModel = new MessageModel(req.body);
        const messageService = new MessageService();
        logger.debug(user.email);
        msg.to = user;

        messageService.send(msg).then(
          () => {
            logger.debug('send to: ' + msg.to.email);
          }
        ).catch(
          (err) => {
            if (err) {
              errorHandler(err, res);
              throw err;
            }
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully sent to all'
      });
    },
    (err) => {}
  );
  res.status(200).json({});
});

export const message = message_router;
