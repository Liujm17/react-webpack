import React from 'react'
import  {  Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";

//本工具用来在组件懒加载近来时候有个空白内容的展示
//在动态导入的帮助下，React Suspense让我们轻松定义延迟加载的组件。
//组件是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。在<OtherComponent />外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化整个页面的交互
const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <div style={{ color: "#000", fontSize: "20px", padding: "30px" }}>
          <LoadingOutlined />
          &nbsp;&nbsp;&nbsp;Loading...
        </div>
      }
    >
      <Component {...props}></Component>
    </Suspense>
  );
};

export default SuspenseComponent
