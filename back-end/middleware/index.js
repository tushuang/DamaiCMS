const jwt = require('jsonwebtoken')
const fs = require('fs')
const PATH = require('path')

const setResHeader = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

const userSigninAuth = (req,res,next)=>{
    try{

        // 获取验证 JWT 时需要用的公钥
        const publicKey = fs.readFileSync(PATH.resolve(__dirname,'../key/public.key'))

        // 验证 Token
        jwt.verify(req.cookies.token, publicKey, (error, decoded) => {
            if (error) {
                console.log(error.message)
                return
            }
            console.log(decoded,333)
            req.token = decoded
            next()
        })
        // 对称加密
        //var decoded = jwt.verify(req.cookies.token, 'i love u'); 
        // 解密后将东西挂在req上
        
    }catch(e){
        res.render('user',{ code:403,data:JSON.stringify('登录可能过期请重新登录')})
    }
}

module.exports = {
    setResHeader,
    userSigninAuth
}