import { TimePicker, DatePicker, Space } from "antd";
import React from 'react'

function onChange(date, dateString) {
  console.log(date, dateString);
}

const TimeAndDate = () => {
  return (
    <>
      <h2>时间选择器</h2>
      <TimePicker bordered={false} />
      <TimePicker.RangePicker bordered={false} />
      <h2>日期选择器</h2>
      <Space direction="vertical">
        <DatePicker onChange={onChange} />
        <DatePicker onChange={onChange} picker="week" />
        <DatePicker onChange={onChange} picker="month" />
        <DatePicker onChange={onChange} picker="quarter" />
        <DatePicker onChange={onChange} picker="year" />
      </Space>
    </>
  );
};

export default TimeAndDate;
