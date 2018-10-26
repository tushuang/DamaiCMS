const none = () => {}

const handleData = (data,res,template,callbacks = {}) => {
    let { success,fail } =  {
        success:callbacks.success||none,
        fail: callbacks.fail || none,
    }
    if(data){
        success()
        response.call(res,{ template, code:200, data:JSON.stringify(data) } )
    }else{
        fail()
        response.call(res,{template, code:500, data:"发生了不可描述的错误"})
    }
}
const response = function ({template,code,data}){
    this.render(template,{
        code:code,
        data:data
    })
} 

module.exports = {
    handleData
}



