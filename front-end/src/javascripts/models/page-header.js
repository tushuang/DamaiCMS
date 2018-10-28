

import URL from 'url'

//根据地址来做相应的匹配
const pageMes = (url,preurl)=>{
    let urlInfo = URL.parse(url)
    let _search = URL.parse(preurl).search
    console.log(URL.parse(preurl))
    let _url = urlInfo.pathname
    let _data = {
        '/home':{
            title:'首页',
            description:'',
            list:[
               
            ]
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
        }
    }

    return _data[_url] || {}
}

export default{
    pageMes
}