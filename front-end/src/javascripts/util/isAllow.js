import user_model from "../models/user";

const isAllow = async page => {
  let _isAllow = await user_model.isAllow(page);
  return new Promise(resolve => {
    switch (_isAllow.code) {
      case 200:
        break;
      case 205:
        break;
      case 403:
        break;
      // {
      //     zeroModal.error({
      //         content:'登录可能过期 请重新登录后再进行操作',
      //         onClosed:()=>{
      //             location.href = '/admin.html'
      //         }
      //     })
      // }
    }
    return resolve(_isAllow.code);
  });
};

export { isAllow };
