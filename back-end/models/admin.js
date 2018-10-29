const mongoose = require('../util/mongoose')
// const hash = require('../util/index')
const Moment = require('moment')
const bcrypt = require('bcrypt')

var adminModel = mongoose.model('users', new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    creatTime:String,
    formatTime:String,
    portrait:String
}));


const signup = (body)=>{
    let _timestamp = Date.now()

    // let _password = await hash.hash(body.password)
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(body.password, salt);
     //把hash值赋值给password变量
    let _password = hash;
    let moment = Moment(_timestamp)//传入一个时间戳
    console.log(_password)
    return new adminModel({
        name:body.name,
        email:body.email,
        password:_password,
        creatTime:_timestamp,
        portrait:'/showPoster/default1.png',
        formatTime:moment.format("YYYY-MM-DD, hh:mm")
    }).save()
    .then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}
const findone = (email) => {
    return adminModel
    .find({ email:email })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })
            
}

const compare =  (password,_password)=>{
    const pwdMatchFlag = bcrypt.compareSync(password, _password);
    
    return  pwdMatchFlag
}

module.exports = {
    signup,
    findone,
    compare
}