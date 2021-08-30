import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./index.scss";
import html from "./lock.js";

class Login extends React.Component {
  //完成输入登陆事件
  onFinish = (values) => {
    console.log("Success:", values);
    this.props.history.push({pathname:'/layout'})
  };
  
  //没有输入完整回调
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    this.props.history.push({pathname:'/layout'})
  };

  componentDidMount() {}

  render() {
    return (
      <div className="bg">
        <div className="login-bg">
          <div className="login-form">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入你的账号!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入你的密码!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="ghost" htmlType="submit">
                  登陆
                </Button>
                <Button type="ghost">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <iframe
          title="bg"
          srcDoc={html}
          frameBorder="0"
          scrolling="yes"
          allowFullScreen
          style={{ width: '100%', border: '0px', height: '100%' }}
        ></iframe>
      </div>
    );
  }
}

export default Login;
