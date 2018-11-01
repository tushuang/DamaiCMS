showModels = {
    演出：showItem,
    海报：showPoster,
    演出明星：showStart,
    演出地点：showSite
    演出时间：showTime
    票预售时间：advanceTicket
    票价：ticketPrice 
}

find 
得到搜索框中的数据 发送get请求 带上参数 { keyword：xxx}
得到数据后 重新渲染list表单

prepage nextpage 点击按钮判断是上一页还是下一页并且传输相应的数据

登录页面 
先在index.js 里做一个验证 用户是否已经登录 如果没有登录 直接跳到登录页面 

webpack 生产配置
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css自动加前缀兼容
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  // 抽离css

### 梳理项目

需求：大麦网管理系统CMS 

管理系统前台项目 + Node.js后台项目


前台项目：

项目工程化工具： Webpack，最大程度进行模块化开发，交由webpack进行打包/编译等等

webpack是基于配置的，基本配置：

entry，output，mudule/rule (loader), plugins (plugin), devServer

css-loader,sass-loader,style-loader,babel-loader,url-loader,string-loader ...

html-webpack-plugin, copy-webpack-plugin

开发架构：RMVC + SPA + MPA

Router: 使用了sme-router实现前端路由切换（基于hash）/ director.js 。。。

Model : 提供数据和数据交互的方法， 利用大量的promise，async，await来进行JS异步编程.

Views ： html片段，利用arttemplate模板引擎进行数据的渲染

Controller： 每一个路由/页面独立逻辑处理

使用了adminLTE模板进行高效快速的开发，使用了大量的Jquery插件优化用户交互体验

引入了高德地图api进行定位和地图显示功能

遇到的问题：

1. 数据交互， 后端返回的数据格式不正确，导致ajax走了error回调...

2. sme-router在异步实例化的时候会出现无法匹配路由的情况，必须保证在init前，router-view已经渲染完成...

3. 模块件私有空间变量不共享，利用events模块实现基于事件机制的发布订阅模式实现跨模块通信


后台项目：

利用express generator生成了应用模板并进行自定义改装

架构：RMVC

Views： 响应给前端的内容结构，封装了各种响应模板

Router： 根据项目api需求进行了路由的划分，使用了大量公用中间件： 响应头处理， 登录权限验证， fileupdate

Controller： 实现具体的业务逻辑，接收请求，响应内容

Model： 提供数据和操作数据库的方法

分离了公共配置，提高代码的可维护性，例如代码版本号

遵循了restful API规范设计项目api接口

数据库选用MongoDB数据库（.....）,封装了mongoose通用操作模块来进行数据库的增删改查

在进行文件操作（。。。）使用fs-extra模块，用户功能模块中，注册中利用bcrypt模块进行密码的加密，monment，利用multer工具创建多个文件处理中间件


细节：

一开始的时候数据验证采用的session机制，当前端请求的时候，利用express-session在后端存储了一条session，express-session会将session—id返回给浏览器（response headers - set-cookie），并且我们可以在这条session中利用req.session.a = 1存储数据

客户端来请求的时候，请求头携带session—id，express-session会根据这个session-id寻找到对应的session，如果不为空，可以取出存储的数据判断/验证等操作

但是因为服务器部署后期变成多个，维护session成本变高，并且项目还有多端登录的需求，后期更改为token的验证模式


首先我们采取了非对称加密机制，生成私钥公钥后，利用jwt规范和工具将用户部分信息加密成token令牌，返回给前端，前端存储在本地，然后再需要验证的时候，前端将token发送给后端，后端利用公钥进行解密后，验证过期时间等条件之后进行数据响应。


服务器部署：

前后端分离部署....

##### webpack生产配置

mode： production

CSS代码抽离： MiniCssWebpackPlugin

css代码压缩： OptimizeCSSAssetsPlugin

JS/CSS 代码文件添加版本号

postcss 给css做兼容处理

externals， 引入cdn资源后，消除模块化中的资源引入
