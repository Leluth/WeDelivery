
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as servicePackage from './servicePackage';



ReactDOM.render(
    <App />,
    document.getElementById('root')
);

servicePackage.unregister();