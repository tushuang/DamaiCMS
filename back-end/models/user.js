const mongoose = require('../util/mongoose')
const adminModel = mongoose.model('users')

const getUserInfo = (id)=>{
    return adminModel.findById(id)
            .then((results)=>{
                console.log(results)
                return results
            }).catch((err)=>{
                return err
            })
}

module.exports = {
    getUserInfo
}