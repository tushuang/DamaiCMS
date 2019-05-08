import userList_model from "../models/userList";
import userList_template from "../views/userList.html";
import { isAllow } from "../util/isAllow";

const list = async (req, res, next) => {
  let _isAllow = await isAllow("list-remove");
  if (_isAllow == 205) {
    location.href = "#/notPower";
  } else {
    let data = {
      pageNo: 1,
      pageSize: 10
    };
    const _data = await userList_model.getUserList(data);
    const _html = template.render(userList_template, {
      data: _data.result
    });
    await res.render(_html);
  }
};

export default {
  list
};
