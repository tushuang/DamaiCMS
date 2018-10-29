
/* 
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.10&key=您申请的key值&plugin=AMap.Transfer"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
*/
import map_template from '../views/map.html'
import {isAllow} from '../util/isAllow'
const map = async (req,res)=>{

    isAllow('map')
    await res.render(map_template)
    if(window.AMap){
        onApiLoaded()
    }else{
        let $script = $('<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script><script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script><script  src="https://webapi.amap.com/maps?v=1.4.10&key=4b03905b1ff241e6e8a1dc11450661f7&callback=onApiLoaded&plugin=AMap.Transfer,AMap.Geocoder" >')
        $('body').append($script)
    }
    

}
window.onApiLoaded = function () {
    var map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:13 //初始化地图层级
    });
    let _result
    new Promise((resolve)=>{  //异步加载 定位到点后 再加载路线
        AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                // onComplete(result)
                console.log(result)  //得到精准定位
                resolve(result) 
            }else{
                onError(result)
            }
        });
    })}).then((result)=>{
        map.panTo(result.position);
        console.log('ok')
        console.log('定位结果：' + result.position);
       // 地理编码，将经纬度处理成地址
    //    regeoCode(result.position)
       // 移动到定位位置
      
    //    创建当前定位点
    //    var marker = new AMap.Marker({
    //         icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
    //         position: result.position,
    //         offset: new AMap.Pixel(-13, -30)
    //     });
    //     marker.setMap(map);
        var transOptions = {
            map: map,
            city: '北京市',
            panel: 'panel',                            
            policy: AMap.TransferPolicy.LEAST_TIME
        };
        //构造公交换乘类
        var transfer = new AMap.Transfer(transOptions);
        //根据起、终点坐标查询公交换乘路线
        transfer.search(new AMap.LngLat(result.position.lng,result.position.lat), new AMap.LngLat(116.370154, 40.037302), function(status, result) {
            // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
            if (status === 'complete') {
                log.success('绘制公交路线完成')
            } else {
                log.error('公交路线数据查询失败' + result)
            }
        });
    })
    

    
}

export default {
    map
}