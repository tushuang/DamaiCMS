
var positionList = require('../models/position')


const list = async (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await positionList.list()  //必须要加await 
    if(_data){
        res.render( 'positionList',{
            code:200,
            data:JSON.stringify(_data) 
        })
    }else{
        res.render( 'positionList',{
            code:404,
            data:"出现了不可预知的错误"
        })
    }
    
}

const save = async (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await positionList.save(req.body)  //必须加上 await
    if(_data){
        res.render( 'positionList',{
            code:200,
            data:JSON.stringify(_data)
        }) 
    }else{
        res.render( 'positionList',{
            code:404,
            data:"出现了不可预知的错误"
        })
    }
    
}

const remove = async (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await positionList.remove(req.query) 
    res.render( 'positionList',{
        code:200,
        data:JSON.stringify(_data)
    }) 
}

const listone = async (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await positionList.listone(req.query) 
    res.render( 'positionList',{
        code:200,
        data:JSON.stringify(_data)
    }) 
}

const alter = async (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await positionList.alter(req.body)  //必须加上 await 
    if(_data){
        res.render( 'positionList',{
            code:200,
            data:JSON.stringify(_data)
        }) 
    }else{
        res.render( 'positionList',{
            code:404,
            data:"出现了不可预知的错误"
        })
    }
    console.log(req.body,111)  //是一个对象
}

module.exports = {
    list,
    save,
    remove,
    listone,
    alter
}