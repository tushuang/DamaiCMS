const mongoose = require('../util/mongoose')
const adminModel = mongoose.model('users')
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化


const getUserInfo = (id)=>{
    return adminModel.findById(id)
            .then((results)=>{
                console.log(results)
                return results
            }).catch((err)=>{
                return err
            })
}



const isAllow = () => {
    return {
        'map': 2,
        'list_limit': 5,
        'list-remove': 6,
        'show-save':5,
        'list-alter':6
    }
}

const alter = async (id,body)=>{
    //根据session值找到对应数据
    //找到后修改
    const _pre = await getUserInfo(id)
    if(!body.portrait) delete body.portrait  
    if(!body.name) delete body.name
    if(_pre.portrait && _pre.portrait != '/portrait/default1.png'&& body.portrait){
        fs.removeSync(PATH.resolve(__dirname, '../public'+_pre.portrait))
    }
    return adminModel.updateOne({_id:id},{...body})
    .then((result)=>{
        console.log(result)
        return result       //渲染好后再给前端
      })
      .catch((err)=>{ 
        return false
    })
    
}

module.exports = {
    getUserInfo,
    isAllow,
    alter
}