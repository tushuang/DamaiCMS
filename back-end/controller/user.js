const user_model = require('../models/user')
const {handleData} = require('../util/handleData')

const isSignIn = (req,res)=>{
    // 前端传token过来 后端解密后 发给前端
    res.render('user',{ code:200,  data:JSON.stringify('登录成功')})

}


const getUserInfo = async (req,res)=>{  // 得到用户信息
    // 根据id查找数据
    const _data = await user_model.getUserInfo(req.token.userid)
    res.render('user',{code:200,data:JSON.stringify({ name:_data.name,email:_data.email,time:_data.formatTime,portrait:_data.portrait})})
}

const exit = async (req,res)=>{
    // 删除session
    req.session.userid = null
    res.render('user',{code:200,data:JSON.stringify('退出成功')})
}

const isAllow = async (req,res)=>{
    const _data = await user_model.getUserInfo(req.cookies.token._id)
    const _isAllow = await user_model.isAllow()[req.query.page]
    if(_data.level >= _isAllow ){
        res.render('user',{code:200,data:JSON.stringify('允许操作')})
    }else{
        res.render('user',{code:205,data:JSON.stringify('权限不够')})
    }

}

const alter = async (req,res)=>{
    console.log(req.body,2222222 )
    const _data = await user_model.alter(req.session.userid,req.body)
    handleData(_data,res,'user')
}


module.exports = {
    isSignIn,
    getUserInfo,
    exit,
    isAllow,
    alter
}