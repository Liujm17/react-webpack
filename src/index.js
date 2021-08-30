import React,{Profiler} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import App from "./App.js";
import { Provider } from "react-redux";


// function onRenderCallback (
//   id, // 发生提交的Profiler树的id
//   phase, // 'mount'/'update'
//   actualDuration, // 本次更新commited花费的时间
//   baseDuration, // 不使用memoization时渲染整棵树所需的时间
//   startTime, // 本次更新中react渲染开始的时间
//   commitTime, // 本次更新中react commited的时间
//   interactions // 本次更新interaction的集合
// ){
//   console.log(startTime,commitTime)
// }

ReactDOM.render(
  <Provider store={store}>
    {/* <Profiler id="Navigation" onRender={onRenderCallback}> */}
      <App />
    {/* </Profiler> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //监控运行速度
