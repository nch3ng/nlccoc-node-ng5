import { RolccFeedService } from './../../services/rolcc/rolcc-feed.service';
import * as express from 'express';
const rolcc = express.Router();

rolcc.get('/today', (req, res) => {
  console.log('get today\'s feed');
  const rolccService = new RolccFeedService();
  rolccService.getTodayFeed().then((feed) => {
    res.status(200).json(feed);
  }).catch(
    (err) => {
      res.status(500).json({ message: err});
    }
  );
});

rolcc.get('/all', (req, res) => {
  const rolccService = new RolccFeedService();
  rolccService.getAllFeeds(2).then((feeds) => {
    res.status(200).json(feeds);
  }).catch(
    (err) => {
      res.status(500).json({ message: err});
    }
  );
});

export default rolcc;
