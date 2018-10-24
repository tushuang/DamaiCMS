


const list = ()=>{
    return $.ajax({
        url:'/api/position/list',
        success:(res)=>{
            return res
        }
    })
}

const save = (data)=>{
    return $.ajax({
        url:'/api/position/list/save',
        type:'post',
        data,  
        success:(res)=>{
            return res
        }
    })
}

const remove = (data)=>{
    return $.ajax({
        url:'/api/position/remove',
        type:'get',
        data,  
        success:(res)=>{
            return res 
        }
    })
}

const listone = (data)=>{
    return $.ajax({
        url:'/api/position/listone',
        type:'get',
        data,
        success:(res)=>{
            return res
        }
    })
}

const alter = (data)=>{
    return $.ajax({
        url:'/api/position/alter',
        type:'post',
        data,
        success:(res)=>{
            return res
        }
    })
}
export default {
    list,
    save,
    remove,
    alter,
    listone
}