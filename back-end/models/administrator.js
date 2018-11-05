const mongoose = require('../util/mongoose')
const adminModel = mongoose.model('users')
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化

const list = ()=>{
    return adminModel.find().sort({level: -1})
        .then((results)=>{
            // 去掉用户的密码 
            const _obj = results;
            for(let i=0;i<_obj.length; i++){
                _obj[i]={
                    _id : _obj[i]._id,
                    name : _obj[i].name,
                    email : _obj[i].email,
                    formatTime : _obj[i].formatTime,
                    level: _obj[i].level
                }
            }
            return _obj
        })
        .catch((err)=>{
            console.log(err)
        })
}

const alter = (id,level)=>{
    return adminModel.updateOne({ _id:id }, { level:level }) //id不会存入数据库 更新数据库里的数据
      .then((result)=>{
        return result       //渲染好后再给前端
      })
      .catch((err)=>{
        return false
    })
}

const remove = (id)=>{
    return adminModel.deleteOne({ _id: id }) //id不会存入数据库 更新数据库里的数据
      .then((result)=>{
        return result       //渲染好后再给前端
      })
      .catch((err)=>{
        return false
    })
}

module.exports = {
    list,
    alter,
    remove
}