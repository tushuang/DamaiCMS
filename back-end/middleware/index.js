

const setResHeader = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

const userSigninAuth = (req,res,next)=>{
    if(req.session.userid){
        next()
    }else{
        res.render('user',{ code:403,data:JSON.stringify('登录可能过期请重新登录')})
    }
}

module.exports = {
    setResHeader,
    userSigninAuth
}