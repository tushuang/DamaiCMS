const getUserList = data => {
  return $.ajax({
    url: "/zq/users",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: data => {
      console.log("res====>", data);
      return data;
    }
  });
};
export default {
  getUserList
};
