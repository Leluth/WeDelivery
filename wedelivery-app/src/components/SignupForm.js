import {Button, Form, Input, message, Modal, Space} from "antd";
import React from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {signup} from "../utils";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
        };
    }

    handleCancel = () => {
        this.setState({
            displayModal: false,
        });
    };

    signupOnClick = () => {
        this.setState({
            displayModal: true,
        });
    };

    onFinish = (data) => {
        signup(data)
            .then(() => {
                this.setState({
                    displayModal: false,
                });
                message.success(`Successfully signed up`);
            })
            .catch((err) => {
                message.error(err.message);
            });
    };

    render = () => {
        return (
            <>
                <Space>
                    <Button shape="round" type="primary" onClick={this.props.returnHome}>
                        Home
                    </Button>
                    <Button shape="round" type="primary" onClick={this.signupOnClick}>
                        Register
                    </Button>
                </Space>
                <Modal
                    title="Register"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                        preserve={false}
                    >

                        <Form.Item
                            name="firstName"
                            rules={[
                                {required: true, message: "Please input your first name!"},
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Firstname"/>
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[
                                {required: true, message: "Please input your last name!"},
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Lastname"/>
                        </Form.Item>

                        <Form.Item
                            name="Username"
                            rules={[
                                {required: true, message: "Please input Username!"},
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Username"/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{required: true, message: "Please input your email!"}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Email"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: "Please input your password!"},
                            ]}
                        >
                            <Input prefix={<LockOutlined/>} placeholder="Password"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </>
        );
    };
}

export default SignupForm;