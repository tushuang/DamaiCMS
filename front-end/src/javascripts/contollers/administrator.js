import adm_model from '../models/administrator'
import adm_template from '../views/Administrator.html'
import bus from '../util/bus'
import {isAllow} from '../util/isAllow'
import userInfo_model from '../models/user'
const list = async (req,res,next)=>{
    let _isAllow = await isAllow('list-remove')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        const _data = await adm_model.list()
        let _userInfo = await userInfo_model.getUserInfo()
        let _email = _userInfo.data.email
        const _html = template.render(adm_template,{
            data:_data.data,
            userInfo:_userInfo.data
        })
        // userInfo()
        await res.render(_html)
        BindEvent()
    }
    
}

const BindEvent = ()=>{
    $('.alter-level').on('click',function(){
        let _str = '<input type="text" id="input-level" class="form-control">'
        let _level_dom = $(this).parents().eq(1).children().eq(3)
        let _level_val = _level_dom.text()
        _level_dom.html(_str)
        $('#input-level').val(_level_val )
        $('#input-level').focus()
        let _id = $(this).parents().eq(1).children().eq(0).text()
        $('#input-level').on('blur',async ()=>{
            let _value = $('#input-level').val()
            if( _value!=_level_val ){
                zeroModal.confirm({
                    content:'确定修改用户权限吗',
                    okFn:  async ()=>{
                        await adm_model.alter({level:_value,id:_id})
                        bus.emit('go','/administrator?'+Date.now())
                    }, 
                    cancelFn:()=>{
                        // let _str = '<span class="label label-success">{{$value.level}}</span>'
                        // $('#level').html(_str)
                        _str = '<span class="label label-success">'+ _level_val+'</span>'
                        _level_dom.html(_str)
                    }
                })
            }else{
                // let _str = '<span class="label label-success">{{$value.level}}</span>'
                // $('#level').html(_str)
                _str = '<span class="label label-success">'+ _level_val+'</span>'
                _level_dom.html(_str)
            }
            
        })
    })
    $('.remove-admin').on('click',async function(){
        let _id = $(this).parents().eq(1).children().eq(0).text()
        zeroModal.confirm({
            content:'确定移除改管理员吗 删除后不可逆',
            okFn:  async ()=>{
                await adm_model.remove({id:_id})
                bus.emit('go','/administrator?'+Date.now())
            }
        })
    })
}

const userInfo =async ()=>{
    let _userInfo = await userInfo_model.getUserInfo()
    let _email = _userInfo.data.email
    $('.userEmail').each(function(){
        if($(this).html() ==_email ){
            $(this).siblings().eq(4).html("") 
        }
    })
}

export default {
    list
}