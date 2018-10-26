var express = require('express');
var router = express.Router();
//处理文件上传的中间件
const fileUpload = require('../middleware/fileUpload')
const show_controller = require('../controller/show')

/* GET users listing. */
router.get('/list', show_controller.list)

router.post('/list/save', fileUpload , show_controller.save)

router.get('/remove',show_controller.remove)

router.get('/listone',show_controller.listone)

router.post('/alter',fileUpload, show_controller.alter)

router.get('/find',show_controller.find)

router.get('/prepage',show_controller.prepage)

router.get('/nextpage',show_controller.nextpage)

module.exports = router;  
