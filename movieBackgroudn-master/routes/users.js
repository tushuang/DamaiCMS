import express from 'express';
import mongodb from 'mongodb';
import _ from 'lodash';
import moment from 'moment';

const MongoClient = mongodb.MongoClient;
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  const params = _.get(req, 'body');

  if (_.isEmpty(params)) {
    res.json({ status: false, mes: 'need pageNo and pageSize' });
    return;
  }

  MongoClient.connect('mongodb://47.94.141.145:27017/movie', async (err, client) => {
    if (err) throw err;
    const { pageNo = 1, pageSize = 10, name = '' } = params;

    var db = client.db('movie');

    let serach = {};
    if (name) {
      let username = new RegExp(name);
      serach = { $or: [{ username: { $regex: username } }] };
    }

    const getAllData = () => {
      return db
        .collection('users')
        .find(serach)
        .toArray();
    };

    const getPageData = () => {
      const skipNums = (pageNo - 1) * pageSize;

      return db
        .collection('users')
        .find(serach)
        .skip(skipNums)
        .limit(pageSize)
        .toArray();
    };

    const [allData, pageData] = await Promise.all([getAllData(), getPageData()]);

    let resultNums = allData.length;
    let resultPage = Math.ceil(resultNums / pageSize);

    const resultData = _.chain(pageData)
      .map((item) => {
        const orders = _.get(item, 'orders', []);
        let createTime = _.get(item, 'createTime');
        if (createTime) {
          createTime = moment(createTime).format('YYYY-MM-DD');
        }

        let priceAll = 0;
        let seatNumAll = 0;

        if (!_.isEmpty(orders)) {
          _.each(orders, (order) => {
            priceAll = priceAll + order.price;
            seatNumAll = seatNumAll + order.seatNum;
          });
        }

        if (createTime) {
          return { ...item, priceAll, seatNumAll, createTime };
        } else {
          return { ...item, priceAll, seatNumAll };
        }
      })
      .value();

    res.json({ status: true, result: resultData, resultNums, resultPage });
  });
});

module.exports = router;
