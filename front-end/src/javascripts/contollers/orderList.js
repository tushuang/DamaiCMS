import orderList_model from "../models/orderList";
import orderList_template from "../views/orderList.html";
import { isAllow } from "../util/isAllow";

const list = async (req, res, next) => {
  let _isAllow = await isAllow("list-remove");
  if (_isAllow == 205) {
    location.href = "#/notPower";
  } else {
    let data = {
      pageNo: 1,
      pageSize: 10,
      name: ""
    };
    const _data = await orderList_model.getorderList(data);
    _data.pageNo = data.pageNo;
    console.log("_data====>", _data);
    const _html = template.render(orderList_template, {
      data: _data
    });
    await res.render(_html);
    bindEvent(_data, res);
  }
};

const bindEvent = (data, res) => {
  $("#toTargetPage").on("click", ".1", async function() {
    console.log("toTargetPage1=====>");
    data.pageNo = 1;
    const _data = await orderList_model.getorderList({
      pageNo: 1,
      pageSize: 10
    });
    const _html = template.render(orderList_template, {
      data: _data
    });
    await res.render(_html);
  });
  $("#toTargetPage").on("click", ".2", async function() {
    console.log("toTargetPage2=====>");
    const _data = await orderList_model.getorderList({
      pageNo: 2,
      pageSize: 10
    });
    const _html = template.render(orderList_template, {
      data: _data
    });
    await res.render(_html);
  });

  $(".remove-order").on("click", async function() {
    let orderId = $(this)
      .parents()
      .eq(1)
      .children()
      .eq(0)
      .text();
    let userId = $(this)
      .parents()
      .eq(1)
      .children()
      .eq(1)
      .text();
    console.log("_id====>", userId);
    let data = {
      orderId: parseInt(orderId),
      userId: parseInt(userId)
    };
    zeroModal.confirm({
      content: "确定移除改管理员吗 删除后不可逆",
      okFn: async () => {
        const _data = await orderList_model.deleteOrder(data);
      }
    });
  });

  $("#orderSearch").on("click", async function() {
    let _value = $("#name").val();
    console.log("_value====>", _value);
    //得到值之后发送ajax请求
    let data = {
      pageNo: 1,
      pageSize: 10,
      name: _value ? _value : ""
    };
    const _data = await orderList_model.getorderList(data);
    _data.pageNo = data.pageNo;
    console.log("_data====>", _data);
    const _html = template.render(orderList_template, {
      data: _data
    });
    await res.render(_html);
  });
};

export default {
  list
};
