import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import axios from "axios";
import LecturerNav from "../../../components/navbar/LecturerNav";
import BeatLoader from "react-spinners/BeatLoader";

function DepartmentDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the list of internship requests
        const fetchInternshipRequests = async () => {
            try {
                // Make a request to fetch internship requests from the backend
                const response = await axios.get(
                    "http://localhost:65124/api/internship-requests"
                );
                setRequests(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching internship requests:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        // Call the fetchInternshipRequests function
        fetchInternshipRequests();
    }, []);

    // Render a React Spinner while the table is loading
    if (loading) {
        return (
            <section>
                <LecturerNav />
                <main className={"coordinator-main"}>
                    <DashboardSideNav link={"/dashboard"} />
                    <aside className={"main-body"}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <BeatLoader color={"#00aced"} loading={loading} size={20} />
                        </div>
                    </aside>
                </main>
            </section>
        );
    }

    // Render "No requests" if the list is empty
    if (requests.length === 0) {
        return (
            <section>
                <LecturerNav />
                <main className={"coordinator-main"}>
                    <DashboardSideNav link={"/dashboard"} />
                    <aside className={"main-body"}>
                        <div className="container my-5">
                            <h5>No internship requests</h5>
                        </div>
                    </aside>
                </main>
            </section>
        );
    }

    // Render the table with internship requests if there are requests
    return (
        <section>
            <LecturerNav />
            <main className={"coordinator-main"}>
                <DashboardSideNav link={"/dashboard"} />
                <aside className={"main-body"}>
                    <section className={"my-5"}>
                        <section className={"my-5"}>
                            <div className="container d-flex justify-content-between">
                                <span className={"h6-inline"}>Recent Internship Requests</span>
                            </div>
                            <div className="container">
                                <table className="table table-sm table-bordered">
                                    <thead className={"thead-dark"}>
                                    <tr>
                                        <th scope="col">Request ID</th>
                                        <th scope="col">Date submitted</th>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Student ID</th>
                                        <th scope="col">Point of Contact</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Department ID</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {requests.map((request) => {
                                        return (
                                            <tr
                                                key={request.id}
                                                onClick={() =>
                                                    navigate(`/department/internship-requests/${request.id}`)
                                                }
                                            >
                                                <td>{request.id}</td>
                                                <td>{request.createdAt.substring(0, 10)}</td>
                                                <td>{request.companyName}</td>
                                                <td>{request.address}</td>
                                                <td>{request.studentId}</td>
                                                <td>{request.pointOfContact}</td>
                                                <td>{request.email}</td>
                                                <td>{request.departmentId}</td>
                                                <td>{request.startDate}</td>
                                                <td>{request.duration}</td>
                                            </tr>
                                        );
                                    })}
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

export default DepartmentDashboard;
