import React, {useRef} from 'react';
import DashboardNav from "../../../components/navbar/DashboardNav";
//import './InternshipRequestForm.css';

const InternshipRequestForm = () => {
    const companyNameRef = useRef(null);
    const addressRef = useRef(null);
    const studentIdRef = useRef(null);
    const pointOfContactRef = useRef(null);
    const emailRef = useRef(null);
    const startDateRef = useRef(null);
    const durationRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestData = {
            companyName: companyNameRef.current.value,
            address: addressRef.current.value,
            studentId: studentIdRef.current.value,
            pointOfContact: pointOfContactRef.current.value,
            email: emailRef.current.value,
            startDate: startDateRef.current.value,
            duration: durationRef.current.value,
        };

        // Submit the request data to the server or perform further actions
        console.log(requestData);
    };

    return (
        <section>
            <DashboardNav/>
            <div className="container mt-5">
                <form className="InternshipRequestForm">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" className="form-control" id="companyName" ref={companyNameRef}
                                       placeholder="Enter company name" required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" ref={addressRef}
                                       placeholder="Enter address" required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID</label>
                                <input type="text" className="form-control" id="studentId" ref={studentIdRef}
                                       placeholder="Enter student ID" required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pointOfContact">Point of Contact</label>
                                <input type="text" className="form-control" id="pointOfContact" ref={pointOfContactRef}
                                       placeholder="Enter point of contact" required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" ref={emailRef}
                                       placeholder="Enter email" required/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input type="date" className="form-control" id="startDate" ref={startDateRef} required/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="duration">Duration (in weeks)</label>
                                <input type="number" className="form-control" id="duration" ref={durationRef}
                                       placeholder="Enter duration" required/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </section>

    );
};

export default InternshipRequestForm;
