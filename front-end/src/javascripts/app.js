require('../stylesheets/app.scss')

import router from './router/index.js'
import auth from "./util/auth"

const body_template = require('./views/body_view.html')


//判断用户是否登录 调用 工具 auth

auth.userSigninAuth(()=>{
    $('#wrapper').html(body_template)
    router.init()
},()=>{
    window.location.href = '../admin.html'
})
