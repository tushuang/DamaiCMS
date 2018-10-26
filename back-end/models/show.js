
const mongoose = require('../util/mongoose')
const Moment = require('moment')
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化

var ShowModel = mongoose.model('shows', new mongoose.Schema({
    showItem: String,
    showStart:String,
    showSite:String,
    advanceTicket:String,
    showTime:String,
    ticketPrice:String,
    newTime:String,
    showPoster:String
}));

const list = () => {  //从数据库里查找数据
   return ShowModel.find({}).limit(5).sort({newTime: -1}) //{}表示查询所有的数据
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

    return new ShowModel({
        ...body,
        newTime:_timestamp,
        createTime:moment.format("YYYY-MM-DD, hh:mm")
       })  //当前端发送post 请求时 得到前端传来的数据 并存入数据库中
      .save()
      .then((result)=>{
        return result      
      })
      .catch((err)=>{
        return false
    })

}

const remove = async ({id}) => { //从数据库里查找数据  remove只传过来一个id 没有showPoster
    let _row = await listone({id})
    return ShowModel.deleteOne({ _id: id }).
    then((results) => {
        if(_row.showPoster){
            fs.removeSync(PATH.resolve(__dirname, '../public'+_row.showPoster))
        }
        return results
    }). 
    catch((err) => {
        return false
    })
}
 
const listone = ({id})=>{
    return ShowModel.findById(id).
    then((results) => {
        return results
    }).
    catch((err) => {
        return false
    })
}

const alter = async (body)=>{
    //更新数据库里的数据
    let _id = body.id //找到传入的id值
    let _row = await listone({id:_id})  //根据id值 在数据库中找到改文件
    //如果用户不重新上传图片 body上的showPoster属性为空 删除后不更新body上的showPoster属性
    if(!body.showPoster) delete body.showPoster  
    if(_row.showPoster && body.showPoster){
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.showPoster))
    }
    return ShowModel.updateOne({ _id: body.id }, { ...body }) //id不会存入数据库 更新数据库里的数据
      .then((result)=>{
        return result       //渲染好后再给前端
      })
      .catch((err)=>{
        return false
    })

}

const find = ({keyword})=>{
    let _filter = {
        $or: [  // 多字段同时匹配
            {showItem: {$regex: keyword}},
            {showStart: {$regex: keyword, $options: '$i'}}, //  $options: '$i' 忽略大小写
            {showSite: {$regex: keyword, $options: '$i'}},
            {advanceTicket: {$regex: keyword, $options: '$i'}},
            {ticketPrice: {$regex: keyword, $options: '$i'}},
            {showTime: {$regex: keyword, $options: '$i'}}
          ]
    }
    // var count = 0
    // local.count(_filter, function (err, doc) { // 查询总条数（用于分页）
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     count = doc
    //   }
    // })
    return ShowModel.find(_filter).limit(5)
    .sort({newTime: -1})  //排序
    .then((result)=>{
        return result       //渲染好后再给前端
      }).catch((err)=>{
        return false
    })

}

const prepage = async ({id,count})=>{
    console.log(id,count)
    let _row = await listone({id})
    let newTime = _row.newTime
    return ShowModel.find({newTime: {$gt: newTime}}).sort({newTime: -1}).skip()
        .limit(5)
        // .sort({newTime: -1})
        .then((result)=>{
            return result
        }).catch((err)=>{
            return false
        })
}
const nextpage = async ({id})=>{
    let _row = await listone({id})
    let newTime = _row.newTime
    return ShowModel.find({newTime: {$lt: newTime}}).limit(5)
        .sort({newTime: -1})
        .then((result)=>{
            return result
        }).catch((err)=>{
            return false
        })
}

module.exports = {
    list,
    save,
    remove,
    listone,
    alter,
    find,
    prepage,
    nextpage
}