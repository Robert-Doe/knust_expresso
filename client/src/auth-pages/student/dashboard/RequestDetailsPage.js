import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineBank, AiOutlineFileText, AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import StudentNav from "../../../components/navbar/StudentNav";
import "./dashboard.css";
import { BsFileText } from "react-icons/bs";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const ProficiencyRequestDetails = ({ additionalInfo }) => {
    return (
        <div>
            <h4>English Proficiency Request Details</h4>
            <div className="details-container">
                <div className="detail-item">
                    <AiOutlineMail className="detail-icon" />
                    <p><strong>Student ID:</strong> {additionalInfo.studentId}</p>
                </div>
                <div className="detail-item">
                    <AiOutlineFileText className="detail-icon" />
                    <p><strong>Transcript URL:</strong> <a href={additionalInfo.transcriptUrl} className="btn btn-warning" download>Download Transcript <FiDownload /></a></p>
                </div>
                {/* Add more detail items as needed */}
            </div>
        </div>
    );
};
const InternshipRequestDetails = ({ additionalInfo }) => {
    return (
        <div>
            <h4>Internship Request Details</h4>
            <div className="details-container">
                <div className="detail-item">
                    <AiOutlineMail className="detail-icon" />
                    <p><strong>Email:</strong> {additionalInfo.email}</p>
                </div>
                <div className="detail-item">
                    <AiOutlineBank className="detail-icon" />
                    <p><strong>Company Name:</strong> {additionalInfo.companyName}</p>
                </div>
                <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <p><strong>Start Date:</strong> {additionalInfo.startDate}</p>
                </div>
                <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <p><strong>Duration:</strong> {additionalInfo.duration} weeks</p>
                </div>
                {/* Add more detail items as needed */}
            </div>
        </div>
    );
};
const ReferenceRequestDetails = ({ additionalInfo }) => {
    return (
        <div>
            <h4>Reference Request Details</h4>
            <div className="details-container">
                <div className="detail-item">
                    <AiOutlineMail className="detail-icon" />
                    <p><strong>School Email:</strong> {additionalInfo.schoolEmail}</p>
                </div>
                <div className="detail-item">
                    <AiOutlineBank className="detail-icon" />
                    <p><strong>School Name:</strong> {additionalInfo.schoolName}</p>
                </div>
                <div className="detail-item">
                    <BsFileText className="detail-icon" />
                    <p><strong>Purpose:</strong> {additionalInfo.purpose}</p>
                </div>
                {/* Add more detail items as needed */}
            </div>
        </div>
    );
};



function RequestDetailsPage() {
    const { requestId } = useParams();
    const [request, setRequest] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:65124/api/requests/${requestId}`);
                setRequest(response.data);

                console.log(response.data.requestType)

                // Based on requestType, fetch additional information
                switch (response.data.requestType) {
                    case "PROFICIENCY":
                        const proficiencyResponse = await axios.get(`http://localhost:65124/api/proficiency-requests/${requestId}`);
                        setAdditionalInfo(proficiencyResponse.data);
                        break;
                    case "REFERENCE":
                        const referenceResponse = await axios.get(`http://localhost:65124/api/reference-requests/${requestId}`);
                        setAdditionalInfo(referenceResponse.data);
                        break;
                    case "INTERNSHIP":
                        const internshipResponse = await axios.get(`http://localhost:65124/api/internship-requests/${requestId}`);
                        setAdditionalInfo(internshipResponse.data);
                        break;
                    default:
                        setAdditionalInfo(null);
                        break;
                }
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };

        fetchRequestDetails();
    }, [requestId]);

    if (!request) {
        return (
            <div>
                <StudentNav />
                <div className="container my-5 text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <StudentNav />
            <main>
                <section className={"my-5"}>
                    <div className="container">
                                <table className="table table-bordered table-sm w-100">
                                    <thead className={'thead-dark'}>
                                    <tr>
                                        <th>Student ID:</th>
                                        <th>Request Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Payment Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{request.studentId}</td>
                                        <td>{request.requestType}</td>
                                        <td>{request.date}</td>
                                        <td>{request.status}</td>
                                        <td>{request.paymentStatus}</td>
                                    </tr>
                                    </tbody>
                                </table>
                    </div>
                </section>
                {additionalInfo && (
                    <section className={"my-5"}>
                        <div className="container">
                            {request.requestType === "PROFICIENCY" && (
                                <div>
                                    <ProficiencyRequestDetails additionalInfo={additionalInfo}/>
                                </div>
                            )}
                            {request.requestType === "REFERENCE" && (
                                <div>
                                    {/* Render Recommendation Letter details using additionalInfo */}
                                    <ReferenceRequestDetails additionalInfo={additionalInfo}/>
                                </div>
                            )}
                            {request.requestType === "INTERNSHIP" && (
                                <div>
                                    <InternshipRequestDetails additionalInfo={additionalInfo}/>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default RequestDetailsPage;
