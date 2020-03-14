import React from 'react';
import './Header.css';
import logo from '../logo.svg';
import {NavLink} from 'react-router-dom';

const Header = () => {

    return(
        <header className="header">
            <NavLink to="/">
                <img src={logo} alt="logo" className="header__logo" />
            </NavLink>
            <span className="header__logo__title">Learn</span>
        </header>
    )
};

export default Header;