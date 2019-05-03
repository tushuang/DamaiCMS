import userList_model from '../models/userList'
import userList_template from '../views/userList.html'
import {isAllow} from '../util/isAllow'

const list = async (req,res,next)=>{
    let _isAllow = await isAllow('list-remove')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        const _data = await userList_model.getUserList()
        const _html = template.render(userList_template,{
            // data:_data.data,
            data:[]
        })
        await res.render(_html)
    }
    
}


export default {
    list
}