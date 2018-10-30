const handleImg = (ele)=>{
    //预览图片
    function changepic() {
        let _img = document.getElementById('showImg')
        var reads= new FileReader();

        let f=document.getElementById(ele).files[0];
        try{
            reads.readAsDataURL(f);
        }catch(e){
            _img.src='';
            $(_img).css({
                'width':"0px",
                'height':"0px"
            })
        }
        reads.onload=function (e) {
            _img.src=this.result;
            $(_img).css({
                'width':"78px",
                'height':"78px"
            })
        }
    }
    window.changepic = changepic;
}

export {
    handleImg
}