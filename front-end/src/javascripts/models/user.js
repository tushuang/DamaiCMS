
const isSignIn = ()=>{
    return $.ajax({
        url:'/api/user/isSignIn',
        success:(data)=>{
            return data
        }
    })
}

const getUserInfo = ()=>{
    return $.ajax({
        url:'api/user/getUserInfo',
        success:(data)=> {
            return data
        }
    })
}

const exit = ()=>{
    return $.ajax({
        url:'api/user/exit',
        success:(data)=> {
            return data
        }
    })
}

const isAllow = ( page )=>{
    return $.ajax({
        url:'api/user/isAllow',
        data:{page},
        success:(data)=> {
            return data
        }
    })
}

export default {
    isSignIn,
    getUserInfo,
    exit,
    isAllow
}