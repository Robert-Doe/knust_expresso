import React from 'react'
import './myDashboard.css'
import logo from "../../../assets/logo.png";
import profile from "../../../assets/myProfie.jpg";
import { RiMenu3Line, RiCloseLine, } from 'react-icons/ri';
import {
    MdClose, MdDarkMode,
    MdGridView, MdLightMode,
    MdLogout,
    MdMenu,
    MdMessage,
    MdNotificationsActive,
    MdReport,
    MdSupport
} from "react-icons/md";
import {BsGridFill} from "react-icons/bs"
import { FaUserCircle, FaFileAlt } from 'react-icons/fa';
import {IoMdDocument, IoMdLogOut, IoMdSettings, IoIosDocument} from 'react-icons/io';
import { TiPen } from 'react-icons/ti';

const MyDashboard = () => {

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const [selectedDate, setSelectedDate] = React.useState('');

    return (
        <>
            <div className='myBody'>
        <div className='myContainer'>
                <aside className="sidebar">
                <div className='top'>
                    <div className="logo">
                        <img src={logo} alt='logo' height={105}/>
                        <h2>knust<span className='danger'>Expresso</span></h2>
                    </div>
                    <div className='close'>
                        <span><MdClose /></span>
                    </div>
                </div>
                <div className="sidebar">
                    <a href="#" >
                      <span ><BsGridFill/></span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href="#">
                        <span><FaUserCircle/></span>
                        <h3>Profile</h3>
                    </a>
                    <a href="#" className='active'>
                        <span><IoMdDocument/></span>
                        <h3>Request</h3>
                    </a>
                    <a href="#">
                        <span><IoMdSettings/></span>
                        <h3>Settings</h3>
                    </a>
                    <a href="#">
                        <span><MdMessage/></span>
                        <h3>Messages</h3>
                        <span className='message-count'>5</span>
                    </a>
                    <a href="#">
                        <span><MdSupport/></span>
                        <h3>Help/Support</h3>
                    </a>
                    <a href="#">
                        <span><MdNotificationsActive/></span>
                        <h3>Notifications</h3>
                    </a>
                    <a href="#">
                        <span><MdLogout/></span>
                        <h3>Logout</h3>
                    </a>

                </div>
                </aside>

            {/*    ----------------- MAIN SECTION ----------------------*/}

                 <main>
                    <h1>Dashboard</h1>
                    <div className="insights">
                        <div className="internship">
                            <span><TiPen/></span>
                            <div className="middle">
                                <div className="left">
                                    <h3>Total request</h3>
                                    <h1> Internship Letter</h1>
                                </div>
                            </div>
                            <small className='text muted'>request internship letter</small>
                        </div>
                        <div className="reference">
                            <span><IoIosDocument/></span>
                            <div className="middle">
                                <div className="left">
                                    <h3>Total request</h3>
                                    <h1> Reference Letter</h1>
                                </div>

                            </div>
                            <small className='text muted'>request internship letter</small>
                        </div>
                        <div className="proficiency">
                            <span><FaFileAlt/></span>
                            <div className="middle">
                                <div className="left">
                                    <h3>Total request</h3>
                                    <h1> Proficiency Letter</h1>
                                </div>

                            </div>
                            <small className='text muted'>request internship letter</small>
                        </div>

                    </div>

                     <div className="recent-request">
                         <h2>Recent Request</h2>
                         <table >
                             {/*<thead>*/}
                             {/*<tr>*/}
                             {/*    <th>Request Type</th>*/}
                             {/*    <th>Request ID</th>*/}
                             {/*    <th>Date submitted</th>*/}
                             {/*    <th>Payment</th>*/}
                             {/*    <th>Status</th>*/}
                             {/*</tr>*/}
                             {/*</thead>*/}
                             <tbody>
                             <tr className="thead">
                                 <td>Request Type</td>
                                 <td>Request ID</td>
                                 <td>Date submitted</td>
                                 <td>Payment</td>
                                 <td>Status</td>
                             </tr>
                             <tr>
                                 <td>Internship request</td>
                                 <td>2045765</td>
                                 <td>25/02/2023</td>
                                 <td>Paid</td>
                                 <td className="warning">Pending</td>
                             </tr>
                             <tr>
                                 <td>Internship request</td>
                                 <td>2045765</td>
                                 <td>25/02/2023</td>
                                 <td>Paid</td>
                                 <td className="warning">Pending</td>
                             </tr>
                             <tr>
                                 <td>Internship request</td>
                                 <td>2045765</td>
                                 <td>25/02/2023</td>
                                 <td>Paid</td>
                                 <td className="warning">Pending</td>
                             </tr>
                             <tr>
                                 <td>Internship request</td>
                                 <td>2045765</td>
                                 <td>25/02/2023</td>
                                 <td>Paid</td>
                                 <td className="warning">Pending</td>
                             </tr>
                             </tbody>
                         </table>
                         <a href="#">Show all</a>
                     </div>
                </main>

            <div className="right">
                <div className="top">
                    <button id="menu-btn">
                        <span> <MdMenu/> </span>
                    </button>
                        {/*<div className="theme-toggler">*/}
                        {/*    <span className="active"><MdLightMode/></span>*/}
                        {/*    <span><MdDarkMode/></span>*/}
                        {/*</div>*/}
                        <div className="profile">
                            <div className="info">
                                <p>Grace Aliko</p>
                                <small className="text-muted">Admin</small>
                            </div>
                            <div className="profile-photo">
                                <img src={profile} alt='profile' height={105}/>
                            </div>
                        </div>
                </div>

            </div>
                </div>
            </div>
        </>
    )
}
export default MyDashboard
