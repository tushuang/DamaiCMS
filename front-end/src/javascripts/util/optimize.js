//函数防抖
function debounce(callback, delay=300, context){
	var t = null;
	return function(e){
		clearTimeout(t);
		t = setTimeout(()=>{
			callback.call(context, e);
		}, delay);
	}
}
//函数节流
function throttle(callback,delay=300,context){
	var starTime = 0; //最开始的时间设置为0 函数一有请求就会触发
	return function(e){
		var end = new Date().getTime();
		if(end - starTime > delay){   //超过delay时间后 才会执行该函数  减少了函数的触发次数
			callback.call(context,e);
			starTime = new Date().getTime();  //调用后 重新给初始值设置时间
		}
	};
}

export {
    debounce,
    throttle
}