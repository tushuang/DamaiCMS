
const list = ()=>{
    return $.ajax({
        url:'/api/administrator/list',
        success:(data)=>{
            return data
        }
    })
}

const alter = (data)=>{
    return $.ajax({
        url:'/api/administrator/alter',
        data,
        success:(data)=>{
            return data
        }
    })
}

const remove = (data)=>{
    return $.ajax({
        url:'/api/administrator/remove',
        data,
        success:(data)=>{
            return data
        }
    })
}

export default {
    list,
    alter,
    remove
}