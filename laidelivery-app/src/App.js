import {Layout, Typography} from "antd";
import React, {useState} from "react";
import logo from './image/logo.svg';
import {makeStyles} from '@material-ui/core/styles';

import "./App.css";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";
import PackageList from './components/PackageList';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const {Header, Content} = Layout;
const {Title} = Typography;
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#626cf5",
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
    overrides:{
        MuiAppBar:{
            root:{
                transform:'translateZ(0)'
            }
        }
    },
    props:{
        MuiIconButton:{
            disableRipple:true
        }
    }
})


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/drone0.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    appMain: {
        paddingLeft: '320px',
        width: '100%'
    }
}));

function App() {
    const [authed, setAuthed] = useState(false);
    const classes = useStyles();

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
                            marginLeft: 5
                        }}>
                        Lai Delivery
                    </Title>

                    <div>{authed ? <MyCart/> : <SignupForm/>}</div>
                </div>

            </Header>


            <Content
                style={{
                    padding: "40px 50px 50px 50px",
                    maxHeight: "calc(100% - 64px)",
                    overflowY: "auto",
                }}
            >
                {authed ? (
                    <PackageList />
                ) : (
                    <LoginForm onSuccess={() => setAuthed(true)}/>
                )}
            </Content>
            <ThemeProvider theme={theme}>

                <CssBaseline />
            </ThemeProvider>
        </Layout>
    );
}

export default App;



