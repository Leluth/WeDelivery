import { Button, Form, Input, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

class LoginForm extends React.Component {
  state = {
    loading: false,
  };

  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    login(data)
        .then(() => {
          this.setState({
            displayModal: false,
          });
          message.success(`Login Successful`);
          this.props.onSuccess();
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
  };

  render = () => {
    return (
        <Form
            name="normal_login"
            onFinish={this.onFinish}
            style={{
              width: 300,
              margin: "auto",
            }}
        >
          <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Login
            </Button>
          </Form.Item>
        </Form>

    );
  };

}

export default LoginForm;