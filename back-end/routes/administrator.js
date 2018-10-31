var express = require('express');
var router = express.Router();
//处理文件上传的中间件
const adm_controller = require('../controller/administrator')
const { setResHeader,userSigninAuth } = require('../middleware')

// 为/show中所有的路由都使用这个中间件
router.use(setResHeader)


router.get('/list',adm_controller.list)
router.get('/alter',adm_controller.alter)
router.get('/remove',adm_controller.remove)


module.exports = router;  
