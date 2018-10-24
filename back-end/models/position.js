
const mongoose = require('../util/mongoose')
const Moment = require('moment')


var Position = mongoose.model('positions', new mongoose.Schema({
    positionName: String,
    companyName:String,
    city:String,
    salary:String,
    createTime:String,
    newTime:String
}));

const list = () => {  //从数据库里查找数据
   return Position.find({}).sort({newTime: -1}) //{}表示查询所有的数据
          then((results)=>{  
            return results
          }).
          catch((err)=>{
              return false
          })
}

 
const save = ( body )=>{
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)//传入一个时间戳

    return new Position({
        ...body,
        newTime:_timestamp,
        createTime:moment.format("YYYY-MM-DD, hh:mm")
       })  //当前端发送post 请求时 得到前端传来的数据 并存入数据库中
      .save()
      .then((result)=>{
        return result       //渲染好后再给前端
      })
      .catch((err)=>{
        return false
    })

}

const remove = ({id}) => { //从数据库里查找数据
    return Position.deleteOne({ _id: id }).
    then((results) => {
        return results
    }).
    catch((err) => {
        return false
    })
}
 
const listone = ({id})=>{
    return Position.findById(id).
    then((results) => {
        return results
    }).
    catch((err) => {
        return false
    })
}

const alter = (body)=>{
    console.log(body)
    //更新数据库里的数据
    return Position.updateOne({ _id: body.id }, { ...body }) //id不会存入数据库
      .then((result)=>{
        return result       //渲染好后再给前端
      })
      .catch((err)=>{
        return false
    })

}

module.exports = {
    list,
    save,
    remove,
    listone,
    alter
}