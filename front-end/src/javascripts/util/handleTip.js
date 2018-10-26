
/*
data:得到的数据来判断操作是否成功
options:三个参数
        isReact 是否弹出提示框 传布尔值 默然为ture
        succuss 成功时的操作
        fail 失败时的操作 

*/


const handleTip = (data,options = {},params = {  })=>{

    let _none = () => {}

    let { isReact,success,fail } = {
        isReact:((typeof options.isReact) !== 'undefined')?options.isReact:true,
        success:options.success || _none,
        fail:options.fail || _none
    }

    if(data.code == 200){
        if(isReact) zeroModal.success({
            content: params.content || '操作成功',
            onClosed:params.onClosed || _none,
            transition: true
        })
        
        if(success) success()
    }else{
        if(isReact) zeroModal.error({
            content: params.content || '操作失败',
            onClosed:params.onClosed || _none,
            transition: true
        })
        if(fail) fail()
    }

}

export default handleTip