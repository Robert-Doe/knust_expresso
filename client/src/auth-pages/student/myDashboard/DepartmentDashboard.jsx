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
    MdReport, MdSearch,
    MdSupport
} from "react-icons/md";
import {BsGridFill} from "react-icons/bs"
import { FaUserCircle, FaFileAlt } from 'react-icons/fa';
import {IoMdDocument, IoMdLogOut, IoMdSettings, IoIosDocument} from 'react-icons/io';
import { TiPen } from 'react-icons/ti';

const DepartmentDashboard =()=>{

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
                       <div className="searchBox">
                           <table className="elementContainer">
                               <tr>
                                   <td>
                                       <input type="text" placeholder='Search' className='search'/>
                                   </td>
                                   <td>
                                       <a href="" className="searchIcon"><MdSearch size='26' color='blue'/></a>
                                   </td>
                               </tr>
                           </table>
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
                                    <td>Student ID</td>
                                    <td>level</td>
                                    <td>Date</td>
                                    <td>Payment</td>
                                    <td>Status</td>
                                </tr>
                                <tr>
                                    <td>2454446</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="danger">Denied</td>
                                </tr>
                                <tr>
                                    <td>Internship request</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="warning">approved</td>
                                </tr>
                                <tr>
                                    <td>Internship request</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="success">Completed</td>
                                </tr>
                                <tr>
                                    <td>Internship request</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="warning">Pending</td>
                                </tr><tr>
                                    <td>2454446</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="danger">Denied</td>
                                </tr>
                                <tr>
                                    <td>2454446</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="danger">Denied</td>
                                </tr>
                                <tr>
                                    <td>2454446</td>
                                    <td>2045765</td>
                                    <td>25/02/2023</td>
                                    <td>Paid</td>
                                    <td className="danger">Denied</td>
                                </tr>
                                </tbody>
                            </table>
                            <a href="#">Show all</a>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}
export default DepartmentDashboard
