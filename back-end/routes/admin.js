var express = require('express');
var router = express.Router();

var admin_controller = require('../controller/admin')
/* GET users listing. */
// /admin/signin
router.post('/signup', admin_controller.signup);
router.post('/signin', admin_controller.signin);
module.exports = router; 
