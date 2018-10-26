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