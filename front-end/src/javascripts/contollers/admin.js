
import admin_model from '../models/admin' 
import admin_form from '../views/admin-form.html'
import qs from 'querystring'
import handleTip from '../util/handleTip'

// 初始化动作
const init = () => {
    // 渲染视图
    render('signin')
    // 绑定事件
    bindEvent()
}

const bindEvent = () => {
    $('#login').on('click', 'a', function () {
        let _type = $(this).data('type')
        render(_type, $(this))
    })
    //使用事件代理 点击切换后 页面的dom元素不再是之前的元素 
    $('#login').on('focus', '.addAnimation', function () {
        $('.owl-login').addClass('password');
    })
    $('#login').on('blur', '.addAnimation', function () {
        $('.owl-login').removeClass('password');
    })

    $('#login').on('submit','#signUp',async function (e) {
        e.preventDefault()  // 阻止表单的默认提交事件
        let _param = $(this).serialize()
        let _data = await admin_model.signUp(qs.parse(_param))
        if(_data.code == 200){
            // 表示注册成功 可跳入登录界面
            zeroModal.success({
                content:'注册成功 点击确认跳往登录页',
                onClosed:()=>{
                    render('signin')
                }
            })  
        }else if(_data.code == 201){
            zeroModal.error({
                content:'邮箱已被注册 请重新输入正确的邮箱地址'
            })  
        }
    })
// 登录 判断密码是否正确 正确返回用户名 在cookie中存入值 记录用户登录的状态
    $('#login').on('submit','#signIn',async function (e) {
        e.preventDefault()  // 阻止表单的默认提交事件
        // 删除本地cookie值 防止重新登录时 不会重新刷新cookie
        $.cookie('connect.sid',{expires: -1})
        let _param = $(this).serialize()
        $.cookie('connect.sid', { expires: -1 })
        let _data = await admin_model.signIn(qs.parse(_param))
        if(_data.code == 200){
            // 表示登录 存一个
            zeroModal.success({
                content:'登录成功 确认跳往首页',
                onClosed:()=>{ 
                    location.href='/'
                }
            })  
        }else {
            zeroModal.error({
                content:_data.data
            })  
        }
    })
}

const render = (type)=>{
    const _html = template.render(admin_form,{
        type:type,
    })
    $('#login').html(_html)
}

export default {
    init
}