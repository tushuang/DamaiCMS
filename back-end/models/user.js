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



const isAllow = () => {
    return {
        'map': 2,
        'list_limit': 5,
        'list-remove': 6,
        'show-save':5,
        'list-alter':6,
    }
}



module.exports = {
    getUserInfo,
    isAllow
}