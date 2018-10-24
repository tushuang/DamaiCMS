var express = require('express');
var router = express.Router();

const position_controller = require('../controller/position')

/* GET users listing. */
router.get('/list', position_controller.list)

router.post('/list/save', position_controller.save)

router.get('/remove',position_controller.remove)

router.get('/listone',position_controller.listone)

router.post('/alter',position_controller.alter)

module.exports = router;  
