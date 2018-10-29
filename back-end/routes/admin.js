var express = require('express');
var router = express.Router();

var admin_controller = require('../controller/admin')
/* GET users listing. */
const { setResHeader } = require('../middleware')

// 为/show中所有的路由都使用这个中间件
router.use(setResHeader)
// /admin/signin
router.post('/signup', admin_controller.signup);
router.post('/signin', admin_controller.signin);
module.exports = router; 
