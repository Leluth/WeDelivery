import {Layout, Typography} from "antd";
import React, {useRef, useState} from "react";
import logo from './image/logo.svg';
import {makeStyles} from '@material-ui/core/styles';
import "./App.css";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";
import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import Main from "./components/Main";
import HeroSection from '../src/components/HeroSection';

const {Header, Content, Footer} = Layout;
const {Title} = Typography;
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#959bf1",
            light: '#3c44b126'
        },
        secondary: {
            main: "#a7abee",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '60vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/drone0.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    appMain: {
        // paddingLeft: '100px',
        width: '100%'
    }
}));

function App() {
    const classes = useStyles();
    const [authed, setAuthed] = useState(false);
    const [welcome, setWelcome] = useState(true);
    const [showPackageList, setShowPackageList] = useState(true);
    const [signal, setSignal] = useState(true)
    const [home, setHome] = useState(true)

    return (
        <Layout style={{height: "100vh"}}>
            <Header>
                <div className="header">
                    <img height={40} src={logo} alt='logo'
                         style={{marginBottom: 5}}/>
                    <Title
                        level={2}
                        style={{
                            color: "white",
                            lineHeight: "inherit",
                            marginBottom: 0,
                            display: "inline",
                            marginLeft: 1
                        }}>
                        Lai Delivery
                    </Title>

                    <div>{authed ?
                        <MyCart
                            setShowPackageList={setShowPackageList}
                            setSignal={() => {setSignal(!signal)}}/>
                        : <SignupForm returnHome = {() => {setHome(!home); setWelcome(true)}}/>}
                    </div>
                </div>
            </Header>

            <ThemeProvider theme={theme}>
                {
                    welcome ? (
                        <HeroSection
                            getStarted = {() => setWelcome(false)}
                            home = {home}/>
                    ) : (
                        <Content
                            style={{
                                padding: "40px 50px 50px 50px",
                                maxHeight: "calc(100% - 64px)",
                                overflowY: "auto",
                            }}
                        >
                            <div className={classes.appMain}>
                                {authed ? (
                                    <Main showPackageList={showPackageList} signal={signal}/>
                                ) : (
                                    <LoginForm onSuccess={() => setAuthed(true)}/>
                                )}
                            </div>
                        </Content>
                    )
                }
                <CssBaseline/>
            </ThemeProvider>
            <Footer style={{textAlign: "center", backgroundColor: "#001529", color: "white"}}>
                LaiDelivery ©2022 Created by Team 3
            </Footer>
        </Layout>
    );
}

export default App;



