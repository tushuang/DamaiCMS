import show_template from '../views/show_list.html'
import show_models from '../models/show'
import show_save from '../views/show_save.html'
import show_alter from '../views/show_alter.html'
import bus from '../util/bus'
import qs from 'querystring'


const list = async (req,res) => {
    let _data = await show_models.list()
    let html = template.render(show_template, {
        data: _data.data
    })

    await res.render(html)
    bindEvent()
}


//show-list 页面的事件绑定

const bindEvent = ()=>{
    //添加
    $('#addbtn').on('click',()=>{
        bus.emit('go','/show-save')
    })
    //删除
    $('.pos-remove').on('click',async function(e){
        let id = $(this).parents('tr').data('id')
        let data = await show_models.remove({id})
        console.log(id,data)
        bus.emit('go','/show?'+ id)
    }) 
    //修改
    $('.pos-alter').on('click',async function(e){
        let _id = $(this).parents('tr').data('id')
        bus.emit('go','/show-alter',{_id})  //页面交互 传id 挂载在了 跳转页面的body身上
    })


}

const save = async (req,res) => {
    await res.render(show_save)
    formEvent()
}

//表单事件的绑定
const formEvent = () => {
    $('#back').on('click',function(e){  //返回到职位信息页
       bus.emit('back','/show')
    })

    $('#save-form').submit( async function(e){  //使用表单的默认提交事件
        e.preventDefault()   

        let _params = qs.parse($(this).serialize())
        //一旦点击提交 发送ajax请求数据 将数据发送给后端并且弹出提示框 是否保存成功 再得到后端返回的数据
        //重新渲染职位信息页面
        let _data = await show_models.save(_params)
    })
}

const alter = async (req,res)=>{
    console.log(req.body)  //body身上有了一个对象  {_id: "5bcff9f24b2ef61d187a15f2"}
    //通过这个id取出一条数据 放到添加信息的页面
    let {_id} = req.body
    let _data = await show_models.listone({id:_id})  //需要传一个对象
    let html = template.render(show_alter, {
        data: _data.data
    })
    await res.render(html)
    alterFormEvent()
}

const alterFormEvent = ()=>{
    $('#alter-form').submit(async function(e){
        e.preventDefault()
        //发送ajax请求 后端更新数据库
        let _params = qs.parse($(this).serialize()) 
        console.log(_params)
        await show_models.alter(_params)
    })
    $('#alter-form #back').on('click',function(){
        bus.emit('go','/show')
    })

}

export default{
    list,
    save,
    alter
}