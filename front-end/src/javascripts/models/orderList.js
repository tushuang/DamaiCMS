const getorderList = data => {
  return $.ajax({
    url: "/zq/order/allList",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: data => {
      return data;
    }
  });
};

const deleteOrder = data => {
  return $.ajax({
    url: "/zq/order/delete",
    method: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: res => {
      return res;
    }
  });
};

export default {
  getorderList,
  deleteOrder
};
