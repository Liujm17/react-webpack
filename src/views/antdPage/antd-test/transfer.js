import React from 'react';
import { Transfer } from 'antd';

class TransFerDemo extends React.Component {
    state = {
      mockData: [],
      targetKeys: [],
    };
  
    componentDidMount() {
      this.getMock();
    }
  
    getMock = () => {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 5; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.setState({ mockData, targetKeys });
    };
  
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
  
    handleChange = targetKeys => {
      this.setState({ targetKeys });
    };
  
    handleSearch = (dir, value) => {
      console.log('search:', dir, value);
    };
  
    render() {
      return (
          //dataSource={this.state.mockData}为全部的list
          //targetKeys={this.state.targetKeys}为未选择的list
        <Transfer
          dataSource={this.state.mockData}
          showSearch
          filterOption={this.filterOption}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          render={item => item.title}
        />
      );
    }
  }
  

export default TransFerDemo