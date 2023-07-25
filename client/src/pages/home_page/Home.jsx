
import React, {useState} from "react";
import logo from '../../assets/Updated Logo.png'
import '../../assets/header_bg.jpg'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import './home.css'
import {Link} from "react-router-dom";

const Home = () => {
    const [toggleMenu, setToggleMenu]= useState(false)
    return (
        <div>
        <div className="home">
            <div className="home__navbar">
                <div className="home__navbar-links">
                    <div className="home__navbar-links_logo">
                        <img src={logo} height={105}/>
                    </div>
                    <div className="home__navbar-links_container">
                        <p><a href="#home">Home</a></p>
                        <p><a href="#about">About</a></p>
                        <p><a href="#services">Services</a></p>
                        <p><a href="#contact">Contact</a></p>
                    </div>
                </div>
                <div className="home__navbar-sign">
                    <Link type="button" className={'homepage-button'}>Sign up</Link>
                </div>
                <div className="home__navbar-menu">
                    {toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                    {toggleMenu && (
                        <div className="home__navbar-menu_container scale-up-center">
                            <div className="home__navbar-menu_container-links">
                                <p><a href="#home">Home</a></p>
                                <p><a href="#about">About</a></p>
                                <p><a href="#services">Services</a></p>
                                <p><a href="#contact">Contact</a></p>
                            </div>
                            <div className="home__navbar-menu_container-links-sign">
                                <button type="button">Sign in</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        <div className="hero">
            <div className="hero-content section__padding" id="home">

                <h1 className="big__text">
                    Obtain your Transcripts<br/>and proficiency letters here.
                </h1>
                <p>Get your English Proficiency, internship ,reference & all academic letters<br/>from the Kwame Nkrumah University of Science and Technology</p>
                <div className="hero-content__input">
                    <button type="button">Sign up</button>
                    <button type="button" className="highlighted">Learn more</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Home
