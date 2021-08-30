import React, { useState } from "react";
import { Tree, Input } from "antd";
const { Search } = Input;
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
          },
          {
            title: "0-0-0-1",
            key: "0-0-0-1",
          },
          {
            title: "0-0-0-2",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-0",
            key: "0-0-1-0",
          },
          {
            title: "0-0-1-1",
            key: "0-0-1-1",
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      {
        title: "0-1-0-0",
        key: "0-1-0-0",
      },
      {
        title: "0-1-0-1",
        key: "0-1-0-1",
      },
      {
        title: "0-1-0-2",
        key: "0-1-0-2",
      },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

const TreeData = () => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  //展开着的树形
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  //选中事件，checkedKeysValue为所有选择的树形,e为详情，包含当前节点
  const onCheck = (checkedKeysValue, e) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  //选择的树形,info为当前详情
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  //搜索函数
//   const onChange = (val) => {
//     const { value } = val.target;
//     let fitData = treeData.map((item) => {
//       if (item.key.includes(value)) {
//         return item;
//       }else{
//           return null
//       }
//     }).filter((item)=>item);
//     console.log(fitData);
//   };
  return (
    <div>
      {/* <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      /> */}
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </div>
  );
};

export default TreeData;
