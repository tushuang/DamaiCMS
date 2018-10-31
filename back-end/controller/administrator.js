const adm_models = require('../models/administrator')
const {handleData} = require('../util/handleData')

const list = async (req,res)=>{
    const _data = await adm_models.list()
    handleData(_data,res,'administrator')
}
const alter = async (req,res)=>{
    const _data = await adm_models.alter(req.query.id,req.query.level)
    // 找到对应id后 修改level值
    handleData(_data,res,'administrator')
}
const remove = async (req,res)=>{
    const _data = await adm_models.remove(req.query.id)
    // 找到对应id后 修改level值
    handleData(_data,res,'administrator')
}
module.exports = {
    list,
    alter,
    remove
}