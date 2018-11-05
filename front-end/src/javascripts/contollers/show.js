import show_template from '../views/show_list.html'
import show_save from '../views/show_save.html'
import show_alter from '../views/show_alter.html'
import show_models from '../models/show'
import bus from '../util/bus'
import qs from 'querystring'
import {isAllow} from '../util/isAllow'
import {handleImg} from '../util/handleImg'

//引入工具
import handleTip from '../util/handleTip'
import {debounce} from '../util/optimize'

const list = async (req,res) => {
    let _data = await show_models.list()
    let html = template.render(show_template, {
        data: _data.data
    })
    await res.render(html)
    bindEvent()
}

const find = async (req,res) => {
    let {data} = req.body
    let html = template.render(show_template, {
        data: data.data
    })
    await res.render(html)
    bindEvent()
}

//show-list 页面的事件绑定
const bindEvent = (params)=>{
    //添加
    $('#addbtn').on('click',()=>{
        bus.emit('go','/show-save')
    })
    //删除
    
    $('.pos-remove').on('click',async function(e){
         let _isAllow = await isAllow('list-remove')
        if(_isAllow == 205){
            location.href = '#/notPower'
        }else{
            let id = $(this).parents('tr').data('id')
            //点击删除时 如果当前只有一页 页面不会自动跳转 由后端传过来是否要翻页 因为后端是最新的数据
            let data = await show_models.remove({id,pageNo:params.pageNo,pageSize:params.pageSize,keyword:params.keyword})
            handleTip(data,{isReact:false})
            if( data.data.isBack && params.pageNo != 1){
                let _num = params.pageNo-1
                bus.emit('go','/list_limit?pageNo='+_num+"&keyword="+params.keyword)
            }else{
                bus.emit('go','/list_limit?pageNo='+params.pageNo+"&"+id+"&keyword="+params.keyword)
            }
        }
        
    }) 
    //修改
    $('.pos-alter').on('click',async function(e){
        let _id = $(this).parents('tr').data('id')
        bus.emit('go','/show-alter',{_id})  //页面交互 传id 挂载在了 跳转页面的body身上
    })
    findByKeywords(params)
    
}
const findByKeywords = (params)=>{
    $('#possearch').on('click', async function(){
        let _value = $('#keywords').val()
        //得到值之后发送ajax请求
        bus.emit('go',`/list_limit?keyword=${_value}`)
    })
}

const listLimit = async (req,res) => {
    let _isAllow = await isAllow('list_limit')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        req.query = req.query || {}
        const _params = {
            pageNo:req.query.pageNo || 1,
            pageSize:req.query.pageSize || 5,
            keyword:req.query.keyword || ""
        }
        let _data = await show_models.listLimit(_params)
        let html = template.render(show_template, {
            data: _data.data
        })
        
        await res.render(html)
        $('#keywords').val(_params.keyword)
        bindEvent(_params)
    }
    
}

const save = async (req,res) => {
    let _isAllow =  await isAllow('show-save')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        await res.render(show_save)
        formEvent()
        handleImg("showPoster")
    }
    
}

//save事件表单的绑定
let _flag = false
const formEvent = () => {
    $('#back').on('click',function(e){  //返回到职位信息页
       bus.emit('go','/list_limit')
    })
    $('#save-form').submit( async function(e){  //使用表单的默认提交事件\
        e.preventDefault()   //阻止默认事件也会花费时间 
        if(_flag) return false
        _flag = true
        // let _params = qs.parse($(this).serialize())
        //一旦点击提交 发送ajax请求数据 将数据发送给后端并且弹出提示框
        let _data = await show_models.save()
        _flag = false
        handleTip(_data,{success:()=>{  
            // $("#save-form button[type=reset]").trigger("click");
        }})
        
    })
}

//修改信息
const alter = async (req,res)=>{
    // console.log(req.body)  //body身上有了一个对象  {_id: "5bcff9f24b2ef61d187a15f2"}
    //通过这个id取出一条数据 放到添加信息的页面
    let _isAllow = await isAllow('list-alter')
    if(_isAllow == 205){
        location.href = '#/notPower'
    }else{
        let {_id} = req.body
        let _data = await show_models.listone({id:_id})  //需要传一个对象
        let html = template.render(show_alter, {
            data: _data.data
        })
        await res.render(html)
        alterFormEvent()
        handleImg("showPoster")
    }
    
}
//修改表单的提交事件
const alterFormEvent = ()=>{
    $('#alter-form').submit(async function(e){
        e.preventDefault()
        //发送ajax请求 后端更新数据库
        let _data = await show_models.alter()
        handleTip(_data)
    })
    $('#alter-form #back').on('click',function(){
        bus.emit('back')
    })

}

export default{
    list,
    save,
    alter,
    find,
    listLimit  
}