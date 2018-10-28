

const signUp = (data)=>{
    return $.ajax({
        url:'/api/admin/signup',
        type:'post',
        data,
        success:(data)=>{
            return data
        }
    })
}

const signIn = (data)=>{
    return $.ajax({
        url:'/api/admin/signin',
        type:'post',
        data,
        success:(data)=>{
            return data
        }
    })
}

export default {
    signUp,
    signIn
}