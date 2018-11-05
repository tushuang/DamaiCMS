import userInfo_view from '../views/userInfo.html'
import user_models from '../models/user'
const render = async ()=>{
    await $('#userInfo').html(userInfo_view)
    let _data = await user_models.getUserInfo()
    $('#userInfo .userName').html(_data.data.name)
    $('#userInfo .portrait').prop('src','http://localhost:3000'+_data.data.portrait)
    $('#userInfo .time').html(_data.data.time)
    $('#exit').on('click', async function(){  // 点击退出调用ajax请求 后端删除session
        $.cookie('token',{expires: -1})
        location.href='/admin.html'

    })
}

export default  {
    render
}