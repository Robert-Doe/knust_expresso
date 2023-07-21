import DashboardNav from "../../../components/navbar/DashboardNav";
import './dashboard.css'
import {BiBulb} from "react-icons/bi";
import {Link, NavLink} from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import {AiFillBulb} from "react-icons/ai";
import {GiGraduateCap, GiTestTubes} from "react-icons/gi";
import {MdMessage, MdSettingsApplications} from "react-icons/md";
import {CgTrack} from "react-icons/cg";
import style from './css/Dashboard.module.css'
import {BsFileText} from "react-icons/bs";
import {HiBriefcase} from "react-icons/hi";




function StudentDashboard(){

    return (
        <section>
            <DashboardNav/>
            <main className={'coordinator-main'}>
                <DashboardSideNav link={'/dashboard'}/>
                <aside className={'main-body'}>
                    <section className={'my-5'}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <Link to={'/student/proficiency-request'}>
                                        <div className="home-menu">
                                            <GiTestTubes size={72} color="blue" />
                                            <h5 className={'menu-title'}>English Proficiency Letter</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <Link to={'/student/reference-request'}>
                                    <div className="home-menu">
                                        <BsFileText size={72} color="green" />
                                        <h5 className={'menu-title'}>Recommendation Letter</h5>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <Link to={'/student/internship-request'}>
                                    <div className="home-menu">
                                        <HiBriefcase size={72} color="orange" />
                                        <h5 className={'menu-title'}>Internship Letter</h5>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <section className={'my-5'}>
                            <div className="container d-flex justify-content-between">
                                <span className={'h6-inline'}>Recent Requests</span>
                            </div>
                            <div className="container">
                                <table className="table table-sm table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col" className="studentRequestDate">Date</th>
                                        <th scope="col">Request Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="paymentStatus">Payment Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className={'intern'}>
                                        <th scope="row">1660717</th>
                                        <td className="studentRequestDate">28-01-2023</td>
                                        <td>English Proficiency</td>
                                        <td>Submitted</td>
                                        <td className="paymentStatus">Paid</td>
                                    </tr>
                                    <tr className={'intern'}>
                                        <th scope="row">1660717</th>
                                        <td className="studentRequestDate">28-01-2023</td>
                                        <td>English Proficiency</td>
                                        <td>Submitted</td>
                                        <td className="paymentStatus">Paid</td>
                                    </tr>
                                    <tr className={'intern'}>
                                        <th scope="row">1660717</th>
                                        <td className="studentRequestDate">28-01-2023</td>
                                        <td>English Proficiency</td>
                                        <td >Submitted</td>
                                        <td className="paymentStatus">Paid</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </section>
                    </section>
                </aside>
            </main>
        </section>
    );
}

export default StudentDashboard;