import React, { useRef, useState } from 'react';
import DashboardNav from '../../../components/navbar/DashboardNav';

const EnglishProficiencyRequestPage = () => {
    const transcriptRef = useRef(null);
    const referenceNumberRef = useRef(null);
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const transcriptFile = transcriptRef.current.files[0];
        const referenceNumber = referenceNumberRef.current.value;

        // Create form data object
        const formData = new FormData();
        formData.append('transcript', transcriptFile);
        formData.append('studentId', referenceNumber);

        try {
            // Send the form data to the server
            const response = await fetch('http://localhost:65124/api/proficiency-requests', {
                method: 'POST',
                body: formData,
            })
            console.log(response.data)
            if (response.ok) {
                setIsRequestSuccessful(true);
            } else {
                setIsRequestSuccessful(false);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setIsRequestSuccessful(false);
        }
    };

    return (
        <section>
            <DashboardNav />
            <div className="container mt-5">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="referenceNumber">Reference Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="referenceNumber"
                                    ref={referenceNumberRef}
                                    placeholder="Enter reference number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="transcript">Transcript</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="transcript"
                                    ref={transcriptRef}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            { !isRequestSuccessful && <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>}
                            {isRequestSuccessful && (
                                <button
                                    type="button"
                                    className="btn btn-success ml-2"
                                    disabled={!isRequestSuccessful}
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

export default EnglishProficiencyRequestPage;
