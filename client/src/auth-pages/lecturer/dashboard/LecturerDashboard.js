import DashboardNav from "../../../components/navbar/DashboardNav";
import {BiBulb} from "react-icons/bi";
import {Link, NavLink, useNavigate} from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import {AiFillBulb} from "react-icons/ai";
import {GiGraduateCap, GiTestTubes} from "react-icons/gi";
import {MdMessage, MdSettingsApplications} from "react-icons/md";
import {CgTrack} from "react-icons/cg";
import style from './css/Dashboard.module.css'
import {BsFileText} from "react-icons/bs";
import {HiBriefcase} from "react-icons/hi";
import axios from "axios";
import {useEffect, useState} from "react";

function LecturerDashboard(){

    const [requests, setRequests] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Function to fetch the list of requests
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:65124/api/reference-requests/lecturer-reference/086017`);
                setRequests(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };


        // Call the fetchRequests function
        fetchRequests();
    }, []);

    return (
        <section>
            <DashboardNav/>
            <main className={'coordinator-main'}>
                <DashboardSideNav link={'/dashboard'}/>
                <aside className={'main-body'}>
                    <section className={'my-5'}>
                        <section className={'my-5'}>
                            <div className="container d-flex justify-content-between">
                                <span className={'h6-inline'}>Recent Requests</span>
                            </div>
                            <div className="container">
                                <table className="table table-sm table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" >Request ID</th>
                                        <th scope="col" >Date submitted</th>
                                        <th scope="col">School / Company</th>
                                        <th scope="col">StudentId</th>
                                        <th scope="col">Purpose</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        requests.map((request)=>{
                                            return(
                                                <tr onClick={()=>navigate(`/lecturer/reference-requests/${request.id}`)}>
                                                    <td>{request.id}</td>
                                                    <td>{request.createdAt.substring(0, 10)}</td>
                                                    <td>{request.schoolName}</td>
                                                    <td>{request.studentId}</td>
                                                    <td>{request.purpose}</td>
                                                </tr>
                                            )
                                        })
                                    }
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

export default LecturerDashboard;