import {GiHamburgerMenu, GiPerson} from "react-icons/gi";
import React, {useContext, useState} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import './StudentNav.css'
import logo from "../../assets/logo.png"
import {MdOutlineVerifiedUser} from "react-icons/md";
import {AiOutlineProfile} from "react-icons/ai";
import {AuthContext} from "../../hooks/AuthContext";
import DashboardSideMdNav from "../../auth-pages/lecturer/details/DashboardSideMdNav";

function StudentNav() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const { logout } = useContext(AuthContext);

    const ProfileCircle = () => {
        const student = JSON.parse(localStorage.getItem('student'))
        const fullName=`${student.firstName} ${student.lastName}`
        const firstLetter = fullName.charAt(0).toUpperCase();
        return (<><div className="profile-circle">
        <span>{firstLetter}</span>
        </div>
                &nbsp;<span className={'profile-name'}>{fullName}</span>&nbsp;
        </>
        );
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const logoutHandler=()=>{
        logout()
        navigate('/signin')
    }

    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-warning justify-content-between'}>
            <div className="navbar-brand brand">
               <img src={logo} alt={"Logo"} height={'40px'}/>  &nbsp;&nbsp; <span
                className={'font-weight-bold'}>KNUST Xpresso</span>
            </div>
            <div className="justify-content-end">
                <div className="profile-dropdown">
                    <button className={'btn bg-transparent'}>
                        <ProfileCircle name="Grace Aliko" />
                    </button>
                    <div className="profile-options">
                        <ul>
                            <li className={'link'} onClick={()=>navigate('/coordinator/edit-profile')}>
                                Edit Profile
                            </li>
                            <li className={'link'} onClick={logoutHandler}>
                                Sign Out
                            </li>
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" onClick={toggleNav} data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <GiHamburgerMenu/></button>
                <div className={`sidenav ${isNavOpen ? 'active' : ''}`}>
                    {/* <button className="close-btn" onClick={toggleNav}>
                    <span className="close-icon"></span>
                </button>*/}
                    <DashboardSideMdNav/>
                </div>
            </div>

        </nav>
    )
}

export default StudentNav;
