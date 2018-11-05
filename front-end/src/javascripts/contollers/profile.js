import user_models from '../models/user'
import profile_template from '../views/profile.html'
import {handleImg} from '../util/handleImg'

const render = async (req,res)=>{
    let _data = await user_models.getUserInfo()
    var _html = template.render(profile_template,{data:_data.data})
    await res.render(_html)
    handleImg("portrait")
    BindEvent()
}

const BindEvent = ()=>{
    $("#alter-msg").on('submit',async function(e){
        e.preventDefault()
        let _data = await user_models.alter()
        if(_data.code == 200){
            zeroModal.success({
                content:'修改成功',
                onClosed:()=>{
                    location.href = '#/profile?reflash'
                }
            })
        } else if(_data.code == 403){
            zeroModal.error({
                content:'登录可能过期 请重新登录后再进行操作',
                onClosed:()=>{
                    location.href = '/admin.html'
                }
            })
        }else{
            zeroModal.error({
                content:'出现了不可预知的错误 修改失败'
            })
        }
    })
}


export default {
    render
}