import { Button, notification } from "antd";
import React from 'react'

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    //自动关闭时间设置，设置为0时候取消自动关闭
    duration: 1,
    //消息提示点击卡片事件
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const Notification = () => {
  return (
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  );
};

export default Notification;
