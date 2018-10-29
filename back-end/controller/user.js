const user_model = require('../models/user')

const isSignIn = (req,res)=>{
    // 查看身上有没有req.session.userid
    if( req.session.userid ){
        res.render('user',{ code:200,  data:JSON.stringify('登录成功')})
    }else{
        res.render('user',{ code:202,  data:JSON.stringify('登录过期，请重新登录')})
    }
}


const getUserInfo = async (req,res)=>{  // 得到用户信息
    // 根据id查找数据
    const _data = await user_model.getUserInfo(req.session.userid)
    res.render('user',{code:200,data:JSON.stringify({ name:_data.name,email:_data.email,time:_data.formatTime,portrait:_data.portrait})})
}

const exit = async (req,res)=>{
    // 删除session
    req.session.userid = null
    res.render('user',{code:200,data:JSON.stringify('退出成功')})
}

module.exports = {
    isSignIn,
    getUserInfo,
    exit
}