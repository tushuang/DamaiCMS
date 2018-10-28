
const show_models = require('../models/show')
const {handleData} = require('../util/handleData')

const list = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.list()  //必须要加await 
    handleData(_data,res,'show_list')
    
}

const save = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.save(req.body)  //必须加上 await  
    handleData(_data,res,'show_list')
}

const remove = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.remove(req.query) 
    handleData(_data,res,'show_list')
}

const listone = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.listone(req.query) 
    handleData(_data,res,'show_list')
}

const alter = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.alter(req.body)  //必须加上 await 
    handleData(_data,res,'show_list')
}

const find = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.find(req.query)  //必须加上 await 
    handleData(_data,res,'show_list')
}

const listLimit = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await show_models.listLimit(req.query)  //必须加上 await 
    handleData(_data,res,'show_list')
}

module.exports = {
    list,
    save,
    remove,
    listone,
    alter,
    find, 
    listLimit
}