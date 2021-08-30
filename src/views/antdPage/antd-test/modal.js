import React,{ useState } from "react";
import { Modal, Button } from "antd";

const Dialog = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
//显示弹窗
  const showModal = () => {
    setIsModalVisible(true);
  };
//弹窗确认
  const handleOk = () => {
    setIsModalVisible(false);
  };
//弹窗取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        打开弹窗
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Dialog;
