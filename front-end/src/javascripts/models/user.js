
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
const alter = ()=>{
    return new Promise((resolve) => {
        $('#alter-msg').ajaxSubmit({
            url: '/api/user/alter',
            type: 'POST',
            success: (results) => {
                resolve(results)
            },
            error: function (e) { console.log('提交失败') } //提交失败执行的函数
        })
    })
}
export default {
    isSignIn,
    getUserInfo,
    exit,
    isAllow,
    alter
}