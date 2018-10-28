const admin_model = require('../models/admin')
const handleData = require('../util/handleData')

const signup = async (req,res,next)=>{
    //将数据传入数据库进行比对 如果没有重复则存入数据
    res.set('content-type', 'application/json; charset=utf8')
    let _isRepeat = await admin_model.findone(req.body.email)
    if(_isRepeat.length == 0){  //等于0说明没有这条数据 则存入数据库
        let _data = await admin_model.signup(req.body)
        if(_data){
            res.render('admin',{
                code:200, // 用户名重复
                data:JSON.stringify('注册成功')
            })
        }else{
            res.render('admin',{
                code:500, // 用户名重复
                data:JSON.stringify('发生了不可预知的错误')
            })
        }
    }else{
        res.render('admin',{
            code:201, // 用户名重复
            data:JSON.stringify('用户名重复')
        })
    }
}

const signin = async (req,res,next)=>{ // 登录
    res.set('content-type', 'application/json; charset=utf8')
    // 先判断有没有这位用户
    let _isRepeat = await admin_model.findone(req.body.email)
    if(_isRepeat.length != 0){  // 有这个用户
        //调用控制层通过邮箱来对比密码
        let isRight = await admin_model.compare(req.body.password,_isRepeat[0].password)
        if(isRight){
            res.render('admin',{
                code:200, 
                data:JSON.stringify("登录成功")
            })
        }else{
            res.render('admin',{
                code:202, // 
                data:JSON.stringify('邮箱或密码输入错误')
            })
        }
    }else{
        res.render('admin',{
            code:203, // 没有这位用户
            data:JSON.stringify('用户不存在')
        })
    }
}

module.exports = {
    signup,
    signin
}