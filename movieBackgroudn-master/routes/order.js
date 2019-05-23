import express from 'express';
import mongodb from 'mongodb';
import _ from 'lodash';
import { handleResult } from '../utils/serverHelp';

const MongoClient = mongodb.MongoClient;
const router = express.Router();

/* GET users listing. */
router.get('/:seqNo', function(req, res, next) {
  const seqNo = _.get(req, 'params.seqNo');
  //* seqNo 为电影指定唯一场次
  if (!seqNo || !_.isNumber(parseInt(seqNo))) {
    res.json({ status: false, mes: '请输入正确的seqNo' });
    return;
  }

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    const db = client.db('movie');

    const result = await db
      .collection('order')
      .find({ seqNo })
      .toArray();

    console.log('result all => ', result);
    if (_.isEmpty(result)) {
      res.json({ status: true, result: [] });
    } else {
      res.json({ status: true, result });
    }
  });
});

router.post('/allList', function(req, res, next) {
  const params = _.get(req, 'body');

  if (_.isEmpty(params)) {
    res.json({ status: false, mes: '请传递正确的参数' });
    return;
  }

  const { pageNo = 0, pageSize = 10, name = '' } = params;

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    const db = client.db('movie');
    let serach = {};
    if (name) {
      let nm = new RegExp(name);
      let cinemaNm = new RegExp(name);
      serach = { $or: [{ nm: { $regex: nm } }, { cinemaNm: { $regex: cinemaNm } }] };
    }

    const getAllData = () => {
      return db
        .collection('order')
        .find(serach)
        .toArray();
    };

    const getPageData = () => {
      const skipNums = (pageNo - 1) * pageSize;

      return db
        .collection('order')
        .find(serach)
        .skip(skipNums)
        .limit(pageSize)
        .toArray();
    };

    const [allData, pageData] = await Promise.all([getAllData(), getPageData()]);

    let resultNums = allData.length;
    let resultPage = Math.ceil(resultNums / pageSize);

    res.json({ status: true, result: pageData, resultNums, resultPage });
  });
});

router.get('/list/:userId', function(req, res, next) {
  const userId = _.get(req, 'params.userId');

  if (!userId || !_.isNumber(parseInt(userId))) {
    res.json({ status: false, mes: '请输入正确的userId' });
    return;
  }

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    const db = client.db('movie');

    const result = await db
      .collection('order')
      .find({ userId: parseInt(userId) })
      .toArray();

    console.log('result all => ', result);
    if (_.isEmpty(result)) {
      res.json({ status: true, result: [] });
    } else {
      res.json({ status: true, result });
    }
  });
});

router.post('/commit', function(req, res, next) {
  const params = _.get(req, 'body');

  if (_.isEmpty(params)) {
    res.json({ status: false });
    return;
  }

  const userId = _.get(params, 'userId');
  const seat = _.get(params, 'seat');
  const seqNo = _.get(params, 'seqNo');

  if (!seqNo) {
    res.json({ status: false, mes: '缺少seqNo' });
  }

  if (!userId) {
    res.json({ status: false, mes: '缺少userId' });
    return;
  }

  if (!_.isArray(seat) || _.isEmpty(seat)) {
    res.json({ status: false, mes: '请输入座位号' });
    return;
  }

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;

    const db = client.db('movie');

    //* 储存order表用于订单座位查询，储存order表用于展示用户购票记录
    try {
      const orderId = Date.now();
      const [result, saveUser] = await Promise.all([
        db.collection('order').insert({ userId, seat, orderId, ...params }),
        db
          .collection('users')
          .update({ userId }, { $push: { orders: { seat, orderId, ...params } } }),
      ]);

      console.log('save order => ', result);
      if (handleResult(result) && handleResult(saveUser)) {
        res.json({ status: true });
      } else {
        console.log();
        res.json({ status: false });
      }
    } catch (e) {
      console.log('[error] commit ===>', e);
      res.json({ status: false });
    }
  });
});

router.delete('/delete', function(req, res, next) {
  const orderId = _.get(req, 'body.orderId');
  const userId = _.get(req, 'body.userId');

  if (!orderId || !userId) {
    res.json({ status: false, mes: '请传orderId和userId' });
    return;
  }

  try {
    MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
      if (err) throw err;
      const db = client.db('movie');

      const removeOrder = () => {
        return db.collection('order').remove({ orderId });
      };

      const removeUserOrder = () => {
        return db.collection('users').update({ userId }, { $pull: { orders: { orderId } } });
      };

      const [resultOrder, resultUser] = await Promise.all([removeOrder(), removeUserOrder()]);

      if (handleResult(resultOrder) && handleResult(resultUser)) {
        res.json({ status: true, mes: '删除成功' });
      } else {
        res.json({ status: false, mes: '删除失败' });
      }
    });
  } catch (e) {
    res.json({ status: false, mes: '删除失败，你先检查orderId传错没' });
  }
});

export default router;
