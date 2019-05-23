import express from 'express';
import mongodb from 'mongodb';
import _ from 'lodash';

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

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    var db = client.db('movie');

    const result = await db
      .collection('users')
      .find({ username, password })
      .toArray();

    if (_.isEmpty(result)) {
      res.json({ status: false, mes: '请先注册' });
    }

    const userId = _.get(result, '0.userId', '');

    if (userId) {
      res.json({ status: true, userId });
    } else {
      res.json({ status: false, mes: '账号有问题' });
    }
  });
});

module.exports = router;
