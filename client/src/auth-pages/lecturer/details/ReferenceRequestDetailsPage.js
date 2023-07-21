import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNav from "../../../components/navbar/DashboardNav";
import "./dashboard.css";
// Rest of the imports...

function ReferenceRequestDetailsPage() {
    const { requestId } = useParams();
    const [referenceRequest, setReferenceRequest] = useState({});
    const [studentFullName, setStudentFullName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the details of the specific request
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:65124/api/reference-requests/${requestId}`);
                setReferenceRequest(response.data);
                console.log(response.data);

                // Fetch the student's full name based on the studentId in the request
                const studentResponse = await axios.get(`http://localhost:65124/api/students/${response.data.studentId}`);
                setStudentFullName(`${studentResponse.data.firstName} ${studentResponse.data.lastName}`);
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
            <main className={"container"}>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <strong>Student ID:</strong> {referenceRequest.studentId}
                        </p>
                        <p>
                            <strong>Student Full Name:</strong> {studentFullName}
                        </p>
                        <p>
                            <strong>Department ID:</strong> {referenceRequest.departmentId}
                        </p>
                        <p>
                            <strong>Lecturer ID:</strong> {referenceRequest.lecturerId}
                        </p>
                        <p>
                            <strong>School Name:</strong> {referenceRequest.schoolName}
                        </p>
                        <p>
                            <strong>School Address:</strong> {referenceRequest.schoolAddress}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <strong>Purpose:</strong> {referenceRequest.purpose}
                        </p>
                        <p>
                            <strong>Transcript URL:</strong>{" "}
                            <a href={referenceRequest.transcriptUrl} className={'btn btn-warning'} download>
                                Download Transcript
                            </a>
                        </p>
                        <p>
                            <strong>Resume URL:</strong>{" "}
                            <a href={referenceRequest.resumeUrl} className={'btn btn-warning'} download>
                                Download Resume
                            </a>
                        </p>
                        <p>
                            <strong>School Email:</strong> {referenceRequest.schoolEmail}
                        </p>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default ReferenceRequestDetailsPage;
