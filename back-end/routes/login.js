var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
//    res.writeHead(200, { 'content-type': 'application/json; charset=utf8' })
    let data =  req.body
    console.log(data)   //解析format-data
    // res.redirect('/#/home'); 
    
    res.end('ok')
});
 
module.exports = router; 
 