import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import axios from "axios";
import LecturerNav from "../../../components/navbar/LecturerNav";
import BeatLoader from "react-spinners/BeatLoader";

function LecturerDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the list of requests
        const fetchRequests = async () => {
            try {
                const lecturer = JSON.parse(localStorage.getItem("lecturer"));
                const response = await axios.get(
                    `http://localhost:65124/api/reference-requests/lecturer-reference/${lecturer.id}`
                );
                setRequests(response.data);
                setLoading(false); // Set loading to false after data is fetched
                console.log(response);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        // Call the fetchRequests function
        fetchRequests();
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
                            <h5>No requests</h5>
                        </div>
                    </aside>
                </main>
            </section>
        );
    }

    // Render the table with requests if there are requests
    return (
        <section>
            <LecturerNav />
            <main className={"coordinator-main"}>
                <DashboardSideNav link={"/dashboard"} />
                <aside className={"main-body"}>
                    <section className={"my-5"}>
                        <section className={"my-5"}>
                            <div className="container d-flex justify-content-between">
                                <span className={"h6-inline"}>Recent Requests</span>
                            </div>
                            <div className="container">
                                <table className="table table-sm table-bordered">
                                    <thead className={"thead-dark"}>
                                    <tr>
                                        <th scope="col">Request ID</th>
                                        <th scope="col">Date submitted</th>
                                        <th scope="col">School / Company</th>
                                        <th scope="col">StudentId</th>
                                        <th scope="col">Purpose</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {requests.map((request) => {
                                        return (
                                            <tr
                                                key={request.id}
                                                onClick={() =>
                                                    navigate(`/lecturer/reference-requests/${request.id}`)
                                                }
                                            >
                                                <td>{request.id}</td>
                                                <td>{request.createdAt.substring(0, 10)}</td>
                                                <td>{request.schoolName}</td>
                                                <td>{request.studentId}</td>
                                                <td>{request.purpose}</td>
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

export default LecturerDashboard;
