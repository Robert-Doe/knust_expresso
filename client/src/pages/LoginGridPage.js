import React from 'react';
import OpaqueNav from "./reuseables/OpaqueNav";
import loginBackground from './knust_login_background.png';
import './login-page.css';
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginGridPage(props) {
    return (
        <section>
            <OpaqueNav title={'Login'} />
            <main>
                <article className="login-background">
                    <img className={'school-image'} src={loginBackground} alt="" />
                </article>
                <section className={'login-links-block py-5'}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 login-link">
                                <div className="content">
                                    <div className="icon-border">
                                        <FaUserTie color={'#f90'} fontSize={80} />
                                    </div>
                                    <h6 className={'title'}>Student</h6>
                                    <Link to={'/signin/student'} className={'btn login-btn'}>Go >></Link>
                                </div>
                            </div>
                            <div className="col-md-3 login-link">
                                <div className="content">
                                    <div className="icon-border">
                                        <FaChalkboardTeacher color={'#f90'} fontSize={80} />
                                    </div>
                                    <h6 className={'title'}>Lecturer</h6>
                                    <Link to={'/signin/lecturer'} className={'btn login-btn'}>Go >></Link>
                                </div>
                            </div>
                            <div className="col-md-3 login-link">
                                <div className="content">
                                    <div className="icon-border">
                                        <FaBuilding color={'#f90'} fontSize={80} />
                                    </div>
                                    <h6 className={'title'}>Department</h6>
                                    <Link to={'/signin/department'} className={'btn login-btn'}>Go >></Link>
                                </div>
                            </div>
                            <div className="col-md-3 login-link">
                                <div className="content">
                                    <div className="icon-border">
                                        <FaUserGraduate color={'#f90'} fontSize={80} />
                                    </div>
                                    <h6 className={'title'}>Proficiency Office</h6>
                                    <Link to={'/signin/proficiency'} className={'btn login-btn'}>Go >></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    );
}

export default LoginGridPage;
