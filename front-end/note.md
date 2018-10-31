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
