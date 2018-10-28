//放回一个布尔值 来告诉主页面是否跳转

let _none = ()=>{}

const userSigninState = ()=>{  //用户是否登录的状态
    let _userStatu = localStorage.userStatu
    if(_userStatu == "signin"){
        console.log('ture')
        return true
    }else{
        console.log('ture')
        return false 
    }
    
}

const userSigninAuth = (success = _none, fail = _none) => {
    let auth = userSigninState()
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