import React, { lazy } from "react";
const Table = lazy(() => import("./antd-test/table.js"));
const Dialog = lazy(() => import("./antd-test/modal.js"));
const Notification = lazy(() => import("./antd-test/notification.js"));
const TreeData = lazy(() => import("./antd-test/tree.js"));
const TreeSelectDemo = lazy(() => import("./antd-test/treeSelect"));
const CollapseDemo = lazy(() => import("./antd-test/collapse.js"));
const TransFerDemo = lazy(() => import("./antd-test/transfer.js"));
const TimeAndDate = lazy(() => import("./antd-test/timeAndDate"));
const SelectDemo = lazy(() => import("./antd-test/select"));

class Home extends React.Component {
  render() {
    return (
      <>
        <h1>表格</h1>
        <Table />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap:"wrap",
            alignItems: "center",
          }}
        >
          <h1>弹窗</h1>
          <Dialog />
          <h1>消息通知</h1>
          <Notification />
          <h1>树形控件</h1>
          <TreeData />
          <h1>树形选择器</h1>
          <div style={{ width: "300px" }}>
            <TreeSelectDemo />
          </div>
          <h1>折叠面板</h1>
          <div style={{ width: "300px" }}>
            <CollapseDemo />
          </div>
          <h1>穿梭框</h1>
          <div style={{ width: "300px" }}>
            <TransFerDemo />
          </div>
          <h1>日期和时间选择器</h1>
          <TimeAndDate />
          <h1>选择器</h1>
          <SelectDemo />
        </div>
      </>
    );
  }
}

export default Home;
