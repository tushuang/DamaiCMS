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
                res.render('user',{ code:403,data:JSON.stringify('出现了不可以预知的错误 请重新登录')})
                return
            }
            let _time =  (Date.now() / 1000) - decoded.iat // 验证用户请求的过期时间 以秒为单位
            let _expires = 1*60*60 // 表示三十秒
            if ( _time > _expires ) {
                res.render('user', {
                    code: 403,
                    data: JSON.stringify({ msg: '登录过期，请重新登录' })
                })
            } else {
                req.token = decoded
                next()
            }        
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