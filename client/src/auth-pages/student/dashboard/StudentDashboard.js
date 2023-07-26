import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { GiTestTubes } from "react-icons/gi";
import { BsFileText } from "react-icons/bs";
import { HiBriefcase } from "react-icons/hi";
import StudentNav from "../../../components/navbar/StudentNav";
import DashboardSideNav from "./DashboardSideNav";
import './dashboard.css'
import ReactPaginate from "react-paginate";

function StudentDashboard() {
    const [recentRequests, setRecentRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state\
    const [currentPage, setCurrentPage] = useState(0); // Add currentPage state
    const requestsPerPage = 5; // Set the number of requests to display per page
    const pagesVisited = currentPage * requestsPerPage;
    const navigate = useNavigate();


    // Calculate the total number of pages based on the number of requests
    const pageCount = Math.ceil(recentRequests.length / requestsPerPage);

    // Update current page when the user clicks on a pagination button
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    useEffect(() => {
        const fetchRecentRequests = async () => {
            try {
                const student = JSON.parse(localStorage.getItem("student"));
                const studentId = student ? student.studentId : null;

                // Include the student ID as a query parameter in the API request
                const response = await axios.get(
                    `http://localhost:65124/api/requests/student/${studentId}`
                );
                setRecentRequests(response.data);
            } catch (error) {
                console.error("Error fetching recent requests:", error);
            } finally {
                setIsLoading(false); // Set isLoading to false after API call
            }
        };

        fetchRecentRequests();
    }, []);

    return (
        <section>
            <StudentNav />
            <main className={"coordinator-main"}>
                <DashboardSideNav link={'/dashboard'}/>
                <aside className={'main-body'}>
                    <div className="container mt-5">
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

                    <section className={"my-5"}>
                        <div className="container d-flex justify-content-between">
                            <span className={"h6-inline"}>Recent Requests</span>
                        </div>
                        <div className="container">
                            {/* Show spinner while loading */}
                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (<>
                                <table className="table table-sm table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col" className="studentRequestDate">
                                            Date
                                        </th>
                                        <th scope="col">Request Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="paymentStatus">
                                            Payment Status
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recentRequests.reverse()
                                        .slice(pagesVisited, pagesVisited + requestsPerPage)
                                        .map((request) => (
                                        <tr onClick={()=>navigate(`/student/request/${request.id}`)} key={request.id} className={request.type}>
                                            <th scope="row">{request.id}</th>
                                            <td className="studentRequestDate">{request.date}</td>
                                            <td>{request.requestType}</td>
                                            <td>{request.status}</td>
                                            <td className="paymentStatus">{request.paymentStatus}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            {/* Pagination */}
                                <ReactPaginate
                                previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        /></>
                            )}
                        </div>
                    </section>
                </aside>
            </main>
        </section>
    );
}

export default StudentDashboard;
