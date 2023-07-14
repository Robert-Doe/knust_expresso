import React from 'react'
import logo from '../../assets/logo.png'
import  './navbar.css'

const Navbar = () => {
    return (
        <div className="app__navbar">
            <div className="app__navbar-links">
                <div className="app__navbar-links_logo">
                    <img src={logo}/>
                </div>
                <div className="app__navbar-links_container">
                    <p><a href="#home">Home</a></p>
                    <p><a href="#about">About</a></p>
                    <p><a href="#services">Services</a></p>
                    <p><a href="#contact">Contact</a></p>
                </div>
                <div className="app__navbar-sign">
                    <button type="button">Sign in</button>
                </div>
            </div>
        </div>

    )
}
export default Navbar
