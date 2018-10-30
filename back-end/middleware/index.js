const jwt = require('jsonwebtoken')

const setResHeader = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

const userSigninAuth = (req,res,next)=>{
    try{
        var decoded = jwt.verify(req.cookies.token, 'i love u'); 
        // 解密后将东西挂在req上
        req.token = decoded
        next()
    }catch(e){
        res.render('user',{ code:403,data:JSON.stringify('登录可能过期请重新登录')})
    }
}

module.exports = {
    setResHeader,
    userSigninAuth
}