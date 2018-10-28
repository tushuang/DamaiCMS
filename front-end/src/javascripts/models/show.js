import { resolve } from "url";



const list = ()=>{
    return $.ajax({
        url:'/api/show/list',
        success:(res)=>{
            return res
        }
    })
}

const save = ()=>{
    return new Promise((resolve) => {
        $('#save-form').ajaxSubmit({
            url: '/api/show/list/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            },
            error: function (e) { console.log('提交失败') } //提交失败执行的函数
        })
    })
    
}

const remove = (data)=>{
    return $.ajax({
        url:'/api/show/remove',
        type:'get',
        data,  
        success:(res)=>{
            return res 
        }
    })
}

const listone = (data)=>{
    return $.ajax({
        url:'/api/show/listone',
        type:'get',
        data,
        success:(res)=>{
            return res
        }
    })
}

const alter = (data)=>{
    return new Promise((resolve) => {
        $('#alter-form').ajaxSubmit({
            url: '/api/show/alter',
            type: 'POST',
            success: (results) => {
                resolve(results)
            },
            error: function (e) { console.log('提交失败') } //提交失败执行的函数
        })
    })
}

const find = (data)=>{
    return $.ajax({
        url:'/api/show/find',
        type:'get',
        data,
        success:(res)=>{
            return res
        }
    })
}
const listLimit = (data)=>{
    return $.ajax({
        url:'/api/show/listLimit',
        type:'get',
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
    listone,
    find,
    listLimit
}