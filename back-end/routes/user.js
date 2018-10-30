var express = require('express');
var router = express.Router();
//处理文件上传的中间件
const user_controller = require('../controller/user')
const fileUpload = require('../middleware/handleUserImg')
const { setResHeader,userSigninAuth } = require('../middleware')

// 为/show中所有的路由都使用这个中间件
router.use(setResHeader)



router.get('/isSignIn',userSigninAuth,user_controller.isSignIn)
router.get('/getUserInfo',userSigninAuth,user_controller.getUserInfo)
router.get('/exit',user_controller.exit)
router.get('/isAllow',userSigninAuth,user_controller.isAllow)
router.post('/alter',userSigninAuth,fileUpload,user_controller.alter)

module.exports = router;  
