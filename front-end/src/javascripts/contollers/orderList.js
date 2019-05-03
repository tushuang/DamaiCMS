import orderList_model from '../models/orderList'
import orderList_template from '../views/orderList.html'
import {isAllow} from '../util/isAllow'

const list = async (req,res,next)=>{
    let _isAllow = await isAllow('list-remove')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        const _data = await orderList_model.getorderList()
        const _html = template.render(orderList_template,{
            // data:_data.data,
            data:[]
        })
        await res.render(_html)
    }
    
}


export default {
    list
}