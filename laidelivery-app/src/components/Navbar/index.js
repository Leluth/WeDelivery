import React from 'react';

import {Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
} from './NavbarElements0';
/*import { FiberManualRecordSharp } from '@mui/icons-material';
*/
import {FaBars} from 'react-icons/fa';

const Navbar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>Lai Delivery</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem><NavLinks to="about">About</NavLinks></NavItem>
                        <NavItem>
                            <NavLinks to="discover">Discover</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="services">Services</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="contact">Contact us</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>

            </Nav>
        </>

    )
}
export default Navbar;