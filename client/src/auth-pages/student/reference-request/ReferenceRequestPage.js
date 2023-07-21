import React, {useState, useEffect, useRef} from 'react';
import DashboardNav from "../../../components/navbar/DashboardNav";

const ReferenceRequestPage = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [lecturers, setLecturers] = useState([]);
    const [selectedLecturer, setSelectedLecturer] = useState('');
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [orderId, setOrderId] = useState('')

    const studentIdRef = useRef(null);
    const schoolNameRef = useRef(null);
    const schoolAddressRef = useRef(null);
    const purposeRef = useRef(null);
    const transcriptFileRef = useRef(null);
    const cvFileRef = useRef(null);
    const schoolEmailRef = useRef(null);


    useEffect(() => {
        // Fetch departments and their lecturers
        const fetchDepartmentsAndLecturers = async () => {
            try {
                const response = await fetch('https://knustexpresso.codeden.org/api/departments/departments-with-lecturers/');
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments and lecturers:', error);
            }
        };

        fetchDepartmentsAndLecturers();
    }, []);

    useEffect(() => {
        // Filter the lecturers based on the selected department
        const filteredLecturers = departments.find((department) => department.id === selectedDepartment)?.lecturers || [];
        setLecturers(filteredLecturers);
        setSelectedLecturer('');
    }, [selectedDepartment, departments]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            studentId: 20523595,
            departmentId: selectedDepartment,
            lecturerId: selectedLecturer,
            schoolName: schoolNameRef.current.value,
            schoolAddress: schoolAddressRef.current.value,
            purpose: purposeRef.current.value,
            transcriptFile: transcriptFileRef.current.files[0],
            cvFile: cvFileRef.current.files[0],
            schoolEmail: schoolEmailRef.current.value,
        };

        const formData = new FormData();
        for (const key in requestData) {
            formData.append(key, requestData[key]);
        }

        try {
            // Send the form data to the server
            const response = await fetch('http://localhost:65124/api/reference-requests/', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            console.log(responseData);

            if (response.ok) {
                setIsRequestSuccessful(true);
                setOrderId(responseData.createdRequest.id)
                console.log(responseData)
            } else {
                setIsRequestSuccessful(false);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setIsRequestSuccessful(false);
        }
    };

    const handlePayment = async () => {
        const paymentData = {
            amount: 20,
            email: "robertdoe009@gmail.com",
            callbackUrl: "https://knustexpresso.codeden.org/api/teller/callback",
            orderId: orderId,
            originUrl: "https://knustexpresso.codeden.org",
            studentId: "20523595"
        };
        try {
            const response = await fetch("https://knustexpresso.codeden.org/api/teller/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
            });

            if (response.ok) {
                const responseData = await response.json();
                window.location.href = responseData.paymentUrl
                console.log("Payment created successfully:", responseData);
                // Perform further actions with the payment response data
            } else {
                console.error("Failed to create payment");
            }
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

    return (
        <section>
            <DashboardNav/>
            <div className="container mt-5">
                <h5 className="py-2 font-weight-bold">Request a recommendation letter</h5>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="departmentId">Department</label>
                                <select
                                    id="departmentId"
                                    className="form-control"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    required
                                >
                                    <option value="">Select department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="lecturerId">Lecturer</label>
                                <select
                                    id="lecturerId"
                                    className="form-control"
                                    value={selectedLecturer}
                                    onChange={(e) => setSelectedLecturer(e.target.value)}
                                    required
                                    disabled={!selectedDepartment}
                                >
                                    <option value="">Select lecturer</option>
                                    {lecturers.map((lecturer) => (
                                        <option key={lecturer.id} value={lecturer.id}>
                                            {`${lecturer.title} ${lecturer.firstName} ${lecturer.lastName}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="schoolName">School Name</label>
                                <input type="text" id="schoolName" className="form-control" ref={schoolNameRef}
                                       required/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="schoolAddress">School Address</label>
                                <input type="text" id="schoolAddress" className="form-control" ref={schoolAddressRef}
                                       required/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="schoolAddress">Purpose</label>
                                <select className={'form-control'} ref={purposeRef} name="purposeOfReference" required>
                                    <option value="" disabled selected>Select Purpose of Reference</option>
                                    <option value="Scholarship">Scholarship</option>
                                    <option value="Employment">Employment</option>
                                    <option value="Academic">Academic</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="cvFile">CV File</label>
                                <input type="file" id="cvFile" className="form-control" ref={cvFileRef}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="transcriptFile">Transcript File</label>
                                <input type="file" id="transcriptFile" className="form-control"
                                       ref={transcriptFileRef}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="schoolEmail">School Email</label>
                                <input type="email" id="schoolEmail" className="form-control" ref={schoolEmailRef}
                                       required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {!isRequestSuccessful &&
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                    Submit
                                </button>}
                            {isRequestSuccessful && (
                                <button
                                    type="button"
                                    className="btn btn-success ml-2"
                                    disabled={!isRequestSuccessful}
                                    onClick={handlePayment}
                                >
                                    Pay
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ReferenceRequestPage;
