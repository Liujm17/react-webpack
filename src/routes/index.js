import { lazy } from "react";
const Home = lazy(() => import("../views/home"));
const About = lazy(() => import("../views/about"));
const Test = lazy(() => import("../views/test"));
const AntdPage = lazy(() => import("../views/antdPage"));
const BuyTicket = lazy(() => import("../views/buyTicket"));
const Component = lazy(() => import("../components"));

const redirect = "/home";

const routes = [
  {
    path: "/home",
    component: Home,
    isShow: true,
    title: "主页",
  },
  {
    path: "/test",
    component: Test,
    isShow: true,
    title: "测试",
  },
  {
    path: "/about",
    component: About,
    isShow: true,
    title: "关于",
  },
  {
    path: "/antdPage",
    component: AntdPage,
    isShow: true,
    title: "antd使用",
  },
  {
    path: "/buyTicket",
    component: BuyTicket,
    isShow: true,
    title: "购票系统",
  },
  {
    path: "/component",
    component: Component,
    isShow: true,
    title: "组件库",
  },
];

export { routes, redirect };
