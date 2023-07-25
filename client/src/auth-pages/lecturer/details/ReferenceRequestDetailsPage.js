import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import DashboardNav from "../../../components/navbar/DashboardNav";
import {AiOutlineUser, AiOutlineBank, AiOutlineFileText, AiOutlineMail} from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";
import "./dashboard.css";
import {FiCheckCircle, FiDownload, FiLoader} from 'react-icons/fi'; // Added FiLoader for loading spinner
import { RingLoader } from 'react-spinners';


function ReferenceRequestDetailsPage() {
    const {requestId} = useParams();
    const [referenceRequest, setReferenceRequest] = useState({});
    const [studentFullName, setStudentFullName] = useState('');
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [isSubmitted, setIsSubmitted] = useState(false)


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

                // Check the status of the request
                const requestStatusResponse = await axios.get(`http://localhost:65124/api/requests/${requestId}`);
                setIsSubmitted(requestStatusResponse.data.status === 'SUBMITTED');

                setIsLoading(false); // Set isLoading to false after all requests are completed
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };

        // Call the fetchRequestDetails function
        fetchRequestDetails();
    }, [requestId]);


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a PDF file to upload.");
            return;
        }

        try {
            setIsUploading(true);
            setUploadMessage('');

            const formData = new FormData();
            formData.append("file", file);

            // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint for handling file uploads
            const response = await axios.post("http://localhost:65124/api/submissions/upload-recommendation", formData);

            // Handle the response accordingly, you may show a success message, etc.
            console.log(response.data);
            setUploadMessage('File uploaded successfully.');

            // Update the request status to SUBMITTED
            await axios.put(`http://localhost:65124/api/requests/${requestId}`, {status: 'SUBMITTED'});

            // Set the isSubmitted state to true
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadMessage('An error occurred while uploading the file. Please try again later.');
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <section>
            <DashboardNav/>
            <main className={"container mb-5"}>
                {isLoading ? ( // Conditional rendering based on isLoading state
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <RingLoader color="#007bff" loading={isLoading} size={100} />
                        </div>
                    ) : ( <div>
                    <h5 className={'mt-5 py-2 font-weight-bold'}>Recommendation Submission {isSubmitted && <FiCheckCircle style={{ color: "green" }} />}</h5>
                    {!isSubmitted && <p className="py-1 text-justify">
                        We hope this message finds you well. We kindly request your valuable assistance in providing a recommendation letter for our student. To guide you in writing the recommendation, we have provided a table below with the necessary details. <br/>
                        Please refer to the table for the required information and follow the instructions provided within. Your insights and support will be greatly appreciated by our student as they pursue their future endeavors.
                    </p> }
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
                                    <td>{referenceRequest.studentId}</td>
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
                                            <AiOutlineBank /> School Name:
                                        </strong>
                                    </td>
                                    <td>{referenceRequest.schoolName}</td>
                                    <td>
                                        <strong>
                                            <AiOutlineBank /> School Address:
                                        </strong>
                                    </td>
                                    <td>{referenceRequest.schoolAddress}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>
                                            <AiOutlineMail /> School Email:
                                        </strong>
                                    </td>
                                    <td >{referenceRequest.schoolEmail}</td>
                                    <td>
                                        <strong>
                                            <AiOutlineFileText /> Purpose:
                                        </strong>
                                    </td>
                                    <td >{referenceRequest.purpose}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>
                                            <AiOutlineFileText /> Transcript URL:
                                        </strong>
                                    </td>
                                    <td colSpan="3">
                                        <a href={referenceRequest.transcriptUrl} className={'btn btn-warning'} download>
                                            Download Transcript <FiDownload />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>
                                            <AiOutlineFileText /> Resume URL:
                                        </strong>
                                    </td>
                                    <td colSpan="3">
                                        <a href={referenceRequest.resumeUrl} className={'btn btn-warning'} download>
                                            Download Resume <FiDownload />
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {!isSubmitted && <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="recommendationFile">Upload Recommendation PDF</label>
                                <input
                                    type="file"
                                    id="recommendationFile"
                                    ref={fileInputRef}
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="form-control-file"
                                />
                            </div>
                            <button type="submit" className="btn btn-warning" disabled={isUploading}>
                                {isUploading ? "Uploading..." : "Submit Request"}
                            </button>
                        </form>
                    </div>}
                    {uploadMessage && <div className="text-success">{uploadMessage}
                    </div>}
                </div>) }
            </main>
        </section>
    );
}

export default ReferenceRequestDetailsPage;







