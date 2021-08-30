import { Select } from "antd";
import React from 'react'

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const SelectDemo = () => {
  return (
    <>
      <h2>禁用选项</h2>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <h2>禁止使用</h2>
      <Select defaultValue="lucy" style={{ width: 120 }} disabled>
        <Option value="lucy">Lucy</Option>
      </Select>
      <h2>懒加载</h2>
      <Select defaultValue="lucy" style={{ width: 120 }} loading>
        <Option value="lucy">Lucy</Option>
      </Select>
      <h2>带清空选项</h2>
      <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
        <Option value="lucy">Lucy</Option>
      </Select>
      <h2>自制选项多选</h2>
      <Select
        mode="multiple"
        style={{ width:120 }}
        placeholder="select one country"
        defaultValue={["china"]}
        onChange={handleChange}
        optionLabelProp="label"
      >
        <Option value="china" label="China">
          <div className="demo-option-label-item">
            <span role="img" aria-label="China">
              🇨🇳
            </span>
            China (中国)
          </div>
        </Option>
        <Option value="usa" label="USA">
          <div className="demo-option-label-item">
            <span role="img" aria-label="USA">
              🇺🇸
            </span>
            USA (美国)
          </div>
        </Option>
        <Option value="japan" label="Japan">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Japan">
              🇯🇵
            </span>
            Japan (日本)
          </div>
        </Option>
        <Option value="korea" label="Korea">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Korea">
              🇰🇷
            </span>
            Korea (韩国)
          </div>
        </Option>
      </Select>
    </>
  );
};

export default SelectDemo;
