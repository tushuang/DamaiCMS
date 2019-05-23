import SMERouter from "sme-router";
import bus from "../util/bus";
import home_template from "../views/home_view.html";
import notFound_template from "../views/404.html";
import notPower_template from "../views/noPower.html";

import profile_controller from "../contollers/profile";
import show_controller from "../contollers/show";
import map_controller from "../contollers/map";
import adm_controller from "../contollers/administrator";
import user_controller from "../contollers/userList";
import order_controller from "../contollers/orderList";

import page_header_controller from "../contollers/page-header";
import page_header_model from "../models/page-header";
var router = null;
let preUrl = "";

const _init = () => {
  router = new SMERouter("router-view"); //决定放入哪个模块
  //插入一个中间件根据地址栏的hash值来给导航加上样式
  router.use((req, res, next) => {
    _activeLink(req.route);
  });

  // router.use((req,res,next)=>{
  //     page_header_controller.render(page_header_model.pageMes(req.url,preUrl))
  //     //在这里页面没有发生跳转 所有这里的url是之前的url
  //     preUrl=req.url
  // })

  // 所有的页面都会匹配到这个
  router.route("/", page_header_render);

  // router.route("/profile", (req, res, next) => {
  //   // 当路由切换进来的时候执行
  //   res.render(profile_controller.render);
  // });
  // router.route('/show',show_controller.list)
  router.route("/list_limit", show_controller.listLimit);
  router.route("/show-alter", show_controller.alter);
  router.route("/profile", profile_controller.render);
  router.route("/map", map_controller.map);
  router.route("/find", show_controller.find);
  router.route("/show-save", show_controller.save);
  router.route("/administrator", adm_controller.list);
  router.route("/userList", user_controller.list);
  router.route("/orderList", order_controller.list);
  router.route("/notFound", (req, res) => {
    res.render(notFound_template);
  });
  router.route("/notPower", (req, res) => {
    res.render(notPower_template);
  });
  router.route("*", (req, res) => {
    if (req.url === "") {
      res.redirect("/home");
    } else {
      res.redirect("/notFound");
    }
  });

  //点击侧边导航 调到指定位置
  $(".sidebar-menu").on("click", "li[to]", function(e) {
    let _path = $(this).attr("to");
    router.go(_path);
  });
};

//添加类名
const _activeLink = route => {
  let $navs = $(".sidebar-menu li[to]");
  $navs
    .filter(`[to='${route}']`)
    .addClass("active")
    .siblings()
    .removeClass("active");
};
//渲染页面头部的函数
const page_header_render = (req, res, next) => {
  page_header_controller.render(page_header_model.pageMes(req.url, preUrl));
  //在这里页面没有发生跳转 所有这里的url是之前的url
  preUrl = req.url;
};

bus.on("go", (path, body = {}, params) => {
  //给req身上挂载 实现页面的交互
  router.go(path, body);
  if (params) params.callback();
});

bus.on("back", () => {
  router.back();
});

export default {
  init: _init
};
