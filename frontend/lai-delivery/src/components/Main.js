import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Route, Switch, Redirect } from "react-router";
import Login from "./Login";
// import Register from "./Register";
import Home from "./Home";

function Main(props) {

    const { isLoggedIn, handleLoggedIn } = props;

    const showLogin = () => {
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
        );
    };

    // const showHome = () => {
    //     return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    // };
    const showHome = () => {
        return <Home />;
    };

    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showHome} />
                <Route path="/login" render={showLogin} />
                {/*<Route path="/register" component={Register} />*/}
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;