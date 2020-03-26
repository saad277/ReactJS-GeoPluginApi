import React, { useState } from 'react';

import {Link} from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,

    NavbarText
} from 'reactstrap';



const Header = () => {

    const [isOpen, setIsOpen] = useState(false);


    const toggle = () => {


        setIsOpen(!isOpen)

    }


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand > <Link to="/">    Chat-App   </Link>  </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar >
                        <NavItem>
                            <NavLink ><Link to="/room">    Room Chat   </Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink ><Link to="/public">    Public Chat   </Link> </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>YOLO</NavbarText>
                </Collapse>
            </Navbar>
        </div>


    )





}


export default Header;

