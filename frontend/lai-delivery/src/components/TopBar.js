
import React from 'react';
// import logo from "../assets/images/logo.svg";

import { LogoutOutlined } from '@ant-design/icons';

function TopBar(props) {
    const { isLoggedIn, handleLogout } = props;
    return (
        <header className="App-header">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}

            {/*<span className="App-title">LSD</span>*/}
            <div className="logo">
                <div className="LSD_A0_Text_20">
                    <span>LSD</span>
                </div>
            </div>
            <div className="Menu">
                <div className="Shipping_______Tracking_______">
                    <span>Shipping</span>
                    <span>Tracking</span>
                    <span>Contact</span>
                </div>
            </div>
            <div className="Grid">
                <svg className="Shape_2_copy">
                    <rect fill="rgba(242,207,43,1)" id="Shape_2_copy" rx="0" ry="0" x="0" y="0" width="25" height="1">
                    </rect>
                </svg>
                <svg className="Shape_2_copy_3">
                    <rect fill="rgba(242,207,43,1)" id="Shape_2_copy_3" rx="0" ry="0" x="0" y="0" width="25" height="1">
                    </rect>
                </svg>
                <svg className="Shape_2_copy_2">
                    <rect fill="rgba(242,207,43,1)" id="Shape_2_copy_2" rx="0" ry="0" x="0" y="0" width="35" height="1">
                    </rect>
                </svg>
            </div>
            {
                isLoggedIn ?
                    <LogoutOutlined className='logout' onClick={handleLogout}/>
                    :
                    null
            }
        </header>
    );
}

export default TopBar;

