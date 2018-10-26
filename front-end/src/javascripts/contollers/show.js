import show_template from '../views/show_list.html'
import show_save from '../views/show_save.html'
import show_alter from '../views/show_alter.html'
import show_models from '../models/show'
import bus from '../util/bus'
import qs from 'querystring'
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
const bindEvent = ()=>{
    //添加
    $('#addbtn').on('click',()=>{
        bus.emit('go','/show-save')
    })
    //删除
    $('.pos-remove').on('click',async function(e){
        let id = $(this).parents('tr').data('id')
        let data = await show_models.remove({id})
        handleTip(data,{isReact:false})
        bus.emit('go','/show?'+ id)
    }) 
    //修改
    $('.pos-alter').on('click',async function(e){
        let _id = $(this).parents('tr').data('id')
        bus.emit('go','/show-alter',{_id})  //页面交互 传id 挂载在了 跳转页面的body身上
    })
    //查找
    $('#keywords').on('input propertychange',debounce( async function(){
        let _value = this.val()
        //得到值之后发送ajax请求
        let _data = await show_models.find({ keyword:_value })
        if(_data.data.length != 0){
            //防止页面跳转 再次查询时不刷新 给页面加上id值
            bus.emit('go','/find?'+Date.now(),{data:_data},{callback:()=>{
                setTimeout(()=>{   //跳转页面后  得到之前页面的值
                    console.log($('#keywords') )
                    $('#keywords').val( _value )
                },0)
                
            }})  //页面交互 传id 挂载在了 跳转页面的body身上
            
        }
    }.bind($('#keywords')),300,this))
    //上一页
    $('#prepage').on('click',async function(){ 
        //得到页面第一条数据的id值
        let _id = $('.show-list__tabel tr').eq(1).data().id
        let _value = parseInt( $('#pageNum').html())
        let _count = 0;
        // console.log((_value-1)*5)
        let _data = await show_models.prepage({id:_id,count:_count})
        if(_data.data.length != 0){
            //防止页面跳转 再次查询时不刷新 给页面加上id值
            console.log(_data,_id)
            bus.emit('go','/find?'+Date.now(),{data:_data},{callback:()=>{
                setTimeout(()=>{   //跳转页面后  得到之前页面的值
                    if(_value != 1){
                        _value--
                        _count = (_value-1)*5
                        console.log(_count)
                        $('#pageNum').html(_value)
                    } 
                    
                },0)
            }})  
        }
    })
    //下一页
    $('#nextpage').on('click',async function(){ 
        //得到页面第一条数据的id值
        let _id
        try{
            _id = $('.show-list__tabel tr').eq(5).data().id
        }catch(e){
        }
        
        let _value = parseInt( $('#pageNum').html())
        let _data = await show_models.nextpage({id:_id})
        if(_data.data.length != 0){
            //防止页面跳转 再次查询时不刷新 给页面加上id值
            console.log(_data,_id)
            bus.emit('go','/find?'+Date.now(),{data:_data},{callback:()=>{
                setTimeout(()=>{   //跳转页面后  得到之前页面的值
                    _value++
                    $('#pageNum').html(_value)
                },0)
            }})  
        }
    })
}

const save = async (req,res) => {
    await res.render(show_save)
    formEvent()
    handleImg()
}

//save事件表单的绑定
let _flag = false
const formEvent = () => {
    $('#back').on('click',function(e){  //返回到职位信息页
       bus.emit('go','/show')
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
            $("#save-form button[type=reset]").trigger("click");
        }})
        
    })
}

const handleImg = ()=>{
    //预览图片
    function changepic() {
        let _img = document.getElementById('showImg')
        var reads= new FileReader();

        let f=document.getElementById('showPoster').files[0];
        try{
            reads.readAsDataURL(f);
        }catch(e){
            _img.src='';
            $(_img).css({
                'width':"0px",
                'height':"0px"
            })
        }
        reads.onload=function (e) {
            _img.src=this.result;
            $(_img).css({
                'width':"78px",
                'height':"78px"
            })
        }
    }
    window.changepic = changepic;
}

//修改信息
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
    handleImg()
}
//修改表单的提交事件
const alterFormEvent = ()=>{
    $('#alter-form').submit(async function(e){
        e.preventDefault()
        //发送ajax请求 后端更新数据库
        // let _params = qs.parse($(this).serialize()) 
        // console.log(_params)
        // let data = await show_models.alter(_params)
        // handleTip(data)
        let _data = await show_models.alter()
        console.log(_data,"00")
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
    find
}