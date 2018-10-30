require('../stylesheets/app.scss')

import router from './router/index.js'
import auth from "./util/auth"
import userInfo_controller from './contollers/userInfo'

const body_template = require('./views/body_view.html')


//判断用户是否登录 调用 工具 auth
  $('#wrapper').html(body_template)
auth.userSigninAuth(()=>{
  
    userInfo_controller.render()
    router.init()
    
    //登录成功后 获取用户的信息
},()=>{
    window.location.href = '../admin.html'
})
