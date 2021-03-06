

import URL from 'url'

//根据地址来做相应的匹配
const pageMes = (url,preurl)=>{
    let urlInfo = URL.parse(url)
    let _search = URL.parse(preurl).search? URL.parse(preurl).search:''
    let _url = urlInfo.pathname
    let _data = {
        '/home':{
            title:'首页',
            description:'',
            list:[]
        },
        '/list_limit':{
            title:'演出列表',
            list:[
                {text:'演出列表',path:'#/list_limit'+_search}
            ]
        },
        '/show-alter':{
            title:'演出列表',
            description:'修改演出详情',
            list:[
                {text:'演出列表',path:'#/list_limit'+_search},
                {text:'演出更新'}
            ]
        },
        '/show-save':{
            title:'演出列表',
            description:'添加演出',
            list:[
                {text:'演出列表',path:'#/list_limit'+_search},
                {text:'添加演出'}
            ]
        },
        '/map':{
            title:"地图",
            list:[
                {text:'地图',path:'#/map'}
            ]
        },
        '/profile':{
            title:"个人中心",
            list:[
                {text:'个人中心',path:'#/profile'}
            ]
        },
        '/notFound':{
            title:"404",
            list:[]
        },
        '/notPower':{
            title:"警告",
            list:[]
        },
        '/administrator':{
            title:"管理管理员",
            list:[
                {text:'管理员列表',path:'#/administrator'}
            ]
        },
        '/userList':{
            title:"用户列表",
            list:[
                {text:'用户列表',path:'#/userList'}
            ]
        },
        '/orderList':{
            title:"查看订单",
            list:[
                {text:'查看订单',path:'#/orderList'}
            ]
        },
    }

    return _data[_url] || {}
}

export default{
    pageMes
}