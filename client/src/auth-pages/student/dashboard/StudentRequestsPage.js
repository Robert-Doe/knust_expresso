import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import DashboardNav from "../../../components/navbar/DashboardNav";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners"; // Import the BeatLoader component
import './pagination.css'
import StudentNav from "../../../components/navbar/StudentNav";


function StudentRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true); // State for the loading spinner
    const requestsPerPage = 5; // Number of requests to display per page
    const navigate = useNavigate()

    useEffect(() => {

        const fetchRequests = async () => {
            try {
                // Parse the student object from localStorage and extract the student ID
                const student = JSON.parse(localStorage.getItem("student"));
                const studentId = student ? student.studentId : null;

                // Include the student ID as a query parameter in the API request
                const response = await axios.get(
                    `http://localhost:65124/api/requests/student/${studentId}`
                );
                setRequests(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchRequests();
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Calculate the index range of requests to display on the current page
    const offset = currentPage * requestsPerPage;
    const currentRequests = requests.slice(offset, offset + requestsPerPage);

    return (
        <section>
            <StudentNav />
            <main className={"container mb-5"}>
                {loading ? ( // Show the spinner if loading is true
                    <div className="vh-100 w-100 d-flex justify-content-center align-items-center loading-spinner">
                        <BeatLoader color={"#007bff"} loading={loading} size={15} />
                    </div>
                ) : (

                <><h5 className={'mt-5'}>All Requests</h5>
                    <div className="request-list">
                        <table className="table table-bordered table-sm">
                            <thead className={'thead-dark'}>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Request Type</th>
                                <th>Status</th>
                                {/* Add more table headings as needed */}
                            </tr>
                            </thead>
                            <tbody>
                            {currentRequests.reverse().map((request) => (
                                <tr key={request.id} onClick={()=>navigate(`/student/request/${request.id}`)}>
                                    <td>{request.id}</td>
                                    <td>{request.date}</td>
                                    <td>{request.requestType}</td>
                                    <td>{request.status}</td>
                                    {/* Add more table cells for additional details */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(requests.length / requestsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </>)}

            </main>
        </section>
    );
}

export default StudentRequestsPage;
