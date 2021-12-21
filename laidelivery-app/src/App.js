import { Layout, Typography } from "antd";
import React from "react";
import { useState } from "react";
import logo from './image/logo.svg';
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

import "./App.css";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";
import PackageList from './components/PackageList';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
    const [authed, setAuthed] = useState(false);

    return (
        <Layout style={{ height: "100vh" }}>
            <Header>
                <div className="header">

                    <div >
                        <img
                            height={40}
                            src={logo}
                            alt='logo'
                            style = {{marginBottom: 5 }}
                        />

                        <Title
                            level = {2}
                            style={{
                                color: "white",
                                lineHeight: "inherit",
                                marginBottom: 0,
                                display: "inline",
                                marginLeft: 10
                            }} >
                            Lai Delivery
                        </Title>
                    </div>


                    <div>{authed ? <MyCart /> : <SignupForm />}</div>
                </div>
            </Header>


            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overflowY: "auto",
                }}
            >
                {authed ? (
                    <PackageList />
                ) : (
                    <LoginForm onSuccess={() => setAuthed(true)} />
                )}

            </Content>
        </Layout>
    );
}

export default App;



