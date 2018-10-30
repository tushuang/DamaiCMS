//放回一个布尔值 来告诉主页面是否跳转

import user_model from '../models/user'

let _none = ()=>{}
// 请求服务器判断是否已经登录
const userSigninState = async ()=>{  //用户是否登录的状态
    let _data = await user_model.isSignIn()
    return !!(_data.code == 200)
}

const userSigninAuth = async (success = _none, fail = _none) => {
    let auth = await userSigninState()
    if ( auth ) {
        success(auth)
        return true;
    } else {
        fail()
        return false
    }
}


export default {
    userSigninState,
    userSigninAuth
}