/* home page */

import React , {useState } from 'react';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import App from '../App'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle} />
            <HeroSection/>
            <App/>
            <InfoSection/>

        </>
    );
};

export default Home;
