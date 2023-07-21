import logo from "../../assets/logo.png"
import {GiHamburgerMenu} from "react-icons/gi";
import React from "react";
import {NavLink} from 'react-router-dom';
import './nav.css'

function OpaqueNav({title}) {
    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-warning'}>
            <div className="navbar-brand brand">
                <img src={logo} alt="Nkabom Project Logo" height={'60px'} className={'nkabom-logo'}/> <span
                className={'font-weight-bold'}>KNUST Expresso</span>
            </div>
        </nav>
    )
}

export default OpaqueNav;