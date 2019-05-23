import express from 'express';
import mongodb from 'mongodb';
import moment from 'moment';
import _ from 'lodash';
import { handleResult } from '../utils/serverHelp';

const MongoClient = mongodb.MongoClient;
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  const params = _.get(req, 'body');

  if (_.isEmpty(params)) {
    res.json({ status: false });
    return;
  }

  const username = _.get(params, 'username');
  const password = _.get(params, 'password');
  const userId = parseInt(moment().valueOf());

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    var db = client.db('movie');

    const isExit = await db
      .collection('users')
      .find({ username })
      .toArray();

    if (!_.isEmpty(isExit)) {
      res.json({ status: false, mes: '已注册的手机号' });
      return;
    }

    const result = await db
      .collection('users')
      .insert({ username, password, userId, createTime: Date.now() });

    if (handleResult(result)) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  });
});

module.exports = router;
