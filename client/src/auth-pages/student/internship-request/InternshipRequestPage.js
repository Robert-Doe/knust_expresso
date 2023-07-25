import React, { useRef, useState } from 'react';
import DashboardNav from "../../../components/navbar/DashboardNav";

const InternshipRequestForm = () => {
    const companyNameRef = useRef(null);
    const addressRef = useRef(null);
    const pointOfContactRef = useRef(null);
    const emailRef = useRef(null);
    const startDateRef = useRef(null);
    const durationRef = useRef(null);
    const [orderId,setOrderId]=useState('')
    const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const student= JSON.parse(localStorage.getItem("student"))
        console.log("Logging Parsed Student : \n", student)

        const requestData = {
            companyName: companyNameRef.current.value,
            address: addressRef.current.value,
            studentId: student.studentId,
            pointOfContact: pointOfContactRef.current.value,
            email: emailRef.current.value,
            startDate: startDateRef.current.value,
            duration: durationRef.current.value,
            departmentId:student.departmentId
        };


        try {
            const response = await fetch('http://localhost:65124/api/internship-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (response.ok) {
                console.log('Internship request submitted successfully');
                // Reset the form fields
                /*companyNameRef.current.value = '';
                addressRef.current.value = '';
                pointOfContactRef.current.value = '';
                emailRef.current.value = '';
                startDateRef.current.value = '';
                durationRef.current.value = '';*/
                setOrderId(requestData.createdRequest.id)
                console.log(requestData);
                setIsRequestSubmitted(true);
            } else {
                console.log('Failed to submit internship request');
            }
        } catch (error) {
            console.error('Error submitting internship request:', error);
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
                window.location.href=responseData.paymentUrl
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
            <DashboardNav />
            <div className="container mt-5">
                <h5 className="py-2 font-weight-bold">Request an internship introductory letter</h5>
                <form className="InternshipRequestForm">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" className="form-control" id="companyName" ref={companyNameRef}
                                       placeholder="Enter company name" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" ref={addressRef}
                                       placeholder="Enter address" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="pointOfContact">Point of Contact</label>
                                <input type="text" className="form-control" id="pointOfContact" ref={pointOfContactRef}
                                       placeholder="Enter point of contact" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" ref={emailRef}
                                       placeholder="Enter email" required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input type="date" className="form-control" id="startDate" ref={startDateRef} required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="duration">Duration (in weeks)</label>
                                <input type="number" className="form-control" id="duration" ref={durationRef}
                                       placeholder="Enter duration" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {!isRequestSubmitted && (
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            )}
                            {isRequestSubmitted && (
                                <button type="button" className="btn btn-success ml-2" onClick={handlePayment}>
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

export default InternshipRequestForm;
