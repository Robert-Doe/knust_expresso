import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineBank, AiOutlineFileText, AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiDownload, FiCheckCircle } from "react-icons/fi";
import DashboardNav from "../../../components/navbar/DashboardNav";
import "./dashboard.css";

function InternshipRequestDetailsPage() {
    const { requestId } = useParams();
    const [internshipRequest, setInternshipRequest] = useState({});
    const [studentFullName, setStudentFullName] = useState('');
    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        // Function to fetch the details of the specific request
        const fetchRequestDetails = async () => {
            try {
                // Fetch the internship request details
                const response = await axios.get(`http://localhost:65124/api/internship-requests/${requestId}`);
                setInternshipRequest(response.data);

                // Fetch the student's full name based on the studentId in the request
                const studentResponse = await axios.get(`http://localhost:65124/api/students/${response.data.studentId}`);
                setStudentFullName(`${studentResponse.data.firstName} ${studentResponse.data.lastName}`);

                // Check the status of the request
                const requestStatusResponse = await axios.get(`http://localhost:65124/api/requests/${requestId}`);
                setIsSubmitted(requestStatusResponse.data.status === 'SUBMITTED');
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };

        // Call the fetchRequestDetails function
        fetchRequestDetails();
    }, [requestId]);



    return (
        <section>
            <DashboardNav />
            <main className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Internship Request Submission {isSubmitted && <FiCheckCircle style={{ color: "green" }} />}</h5>
                        <p>
                            Dear sir/madam, please use the table below to assist you in writing the requested recommendation. Further
                            instructions would be given in the table.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td>
                                    <strong>
                                        <AiOutlineUser /> Student ID:
                                    </strong>
                                </td>
                                <td>{internshipRequest.studentId}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        <BsFillPersonFill /> Student Full Name:
                                    </strong>
                                </td>
                                <td>{studentFullName}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        <AiOutlineBank /> Company Name:
                                    </strong>
                                </td>
                                <td>{internshipRequest.companyName}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        <AiOutlineBank /> Company Address:
                                    </strong>
                                </td>
                                <td>{internshipRequest.address}</td>
                            </tr>
                            {/* Add more rows based on your table data */}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isSubmitted ? (
                    // Render content when the file is submitted
                    <div>
                        <p>File submitted successfully.</p>
                        <a href={/* Link to download submitted file */} download>
                            Download Submitted File <FiDownload />
                        </a>
                    </div>
                ) : (
                    // Render form for submission when the file is not submitted
                    <div>
                        <form onSubmit={handleSubmit}>
                            {/* Your form inputs and submit button */}
                        </form>
                        {uploadMessage && <div className="text-success">{uploadMessage}</div>}
                    </div>
                )}
            </main>
        </section>
    );
}

export default InternshipRequestDetailsPage;
