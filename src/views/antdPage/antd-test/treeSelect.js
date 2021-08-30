import React from 'react';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

class TreeSelectDemo extends React.Component {
  state = {
    value: undefined,
    treeData: [
        { id: 1, pId: 0, value: '1', title: 'Expand to load' },
        { id: 2, pId: 0, value: '2', title: 'Expand to load' },
        { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
      ],
  };
  //懒加载
  genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };
    //懒加载
  onLoadData = ({ id }) =>
  new Promise(resolve => {
    setTimeout(() => {
      this.setState({
        treeData: this.state.treeData.concat([
          this.genTreeNode(id, false),
          this.genTreeNode(id, true),
        ]),
      });
      resolve();
    }, 300);
  });

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        treeData={this.state.treeData}
      >
      </TreeSelect>
    //   懒加载
    //    <TreeSelect
    //    treeDataSimpleMode
    //    style={{ width: '100%' }}
    //    value={this.state.value}
    //    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    //    placeholder="Please select"
    //    allowClear
    //    multiple
    //    treeDefaultExpandAll
    //    treeData={this.state.treeData}
    //    onChange={this.onChange}
    //    loadData={this.onLoadData}
    //  >
    //  </TreeSelect>
    );
  }
}

export default TreeSelectDemo