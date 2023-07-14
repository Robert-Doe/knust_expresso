import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

function AcademicInformationComponent({onPrevious,onNext,addStudentDetail,studentDetails}) {
    const studentIdRef = useRef(null)
    const indexNoRef = useRef(null)
    const gradTypeRef=useRef(null)
    const admissionYearRef= useRef(null)
    const programmeRef=useRef(null)
    const graduationYearRef=useRef(null)

    const [programmes, setProgrammes] = useState([]);

    useEffect(() => {
        // Fetch the programmes from the departments endpoint
        axios.get('https://knustexpresso.codeden.org/api/departments')
            .then(response => {
                // Extract the programme names from the response data
                const programmeNames = response.data;

                // Set the fetched programmes in the state
                setProgrammes(programmeNames);
            })
            .catch(error => {
                console.error('Error fetching programmes:', error);
            });
    }, []);

    useEffect(() => {
        studentIdRef.current.value = studentDetails.studentId ?? '';
        indexNoRef.current.value = studentDetails.indexNumber ?? '';
        gradTypeRef.current.value = studentDetails.gradType ?? '';
        admissionYearRef.current.value = studentDetails.admissionYear ?? '';
        programmeRef.current.value = studentDetails.programme ?? '';
        graduationYearRef.current.value = studentDetails.graduationYear ?? '';
    }, []);


    function handleAcademicInformation(e) {
        e.preventDefault()
        addStudentDetail({
            studentId: studentIdRef.current.value,
            indexNumber: indexNoRef.current.value,
            gradType: gradTypeRef.current.value,
            admissionYear: admissionYearRef.current.value,
            programme: programmeRef.current.value,
            graduationYear: graduationYearRef.current.value,
        })

        onNext()

    }

    function generateYearOptions(startYear, endYear) {
        const options = [];
        for (let year = startYear; year <= endYear; year++) {
            options.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return options;
    }


    return (
        <section>
            <div className="container mt-1 p-5">
                <form onSubmit={handleAcademicInformation}>
                    <div className={` d-flex flex-column align-items-center`}>
                        <h4 className={'font-weight-bolder'}>Academic Information</h4>
                        <p className={'m-3'}>Complete the form below with your academic data</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <div className={``}>
                                    <label htmlFor="fname" className={'text-dark'}>Student Number</label>
                                    <input type="text" ref={studentIdRef} id={'studentNumber'} className={'form-control'}
                                           placeholder={'Enter your given name'}/>
                                </div>

                            </div>
                            <div className="col-md-6 mt-3">
                                <div className={``}>
                                    <label htmlFor="sname" className={'text-dark'}>Index Number</label>
                                    <input type="text" ref={indexNoRef} id={'sindex'} className={'form-control'}
                                           placeholder={'Enter your surname'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="graduateType">Graduate Type</label>
                                <select id="graduateType"  ref={gradTypeRef} className="form-control">
                                    <option value="">Select an option</option>
                                    <option value="Under Graduate">Undergraduate</option>
                                    <option value="Post Graduate">Post Graduate</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label htmlFor="admissionYear">Admission Year</label>
                                <select id="admissionYear" ref={admissionYearRef} className="form-control">
                                    <option value="">Select an option</option>
                                    {generateYearOptions(1990, new Date().getFullYear())}
                                </select>
                            </div>

                        </div>
                        <div className="row ">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="programme">Programme of Study</label>
                                <select id="programme" ref={programmeRef} className="form-control">
                                    <option value="">Select an option</option>
                                    {programmes.map((programme, index) => (
                                        <option key={index} value={programme.name}>
                                            {programme.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label htmlFor="graduationYear">Graduation or Last Study Year</label>
                                <select id="admissionYear" ref={graduationYearRef} className="form-control">
                                    <option value="">Select an option</option>
                                    {generateYearOptions(1990, new Date().getFullYear())}
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="w-100 d-flex justify-content-between mt-5">
                        <button type="button" className={'btn btn-primary'} onClick={onPrevious}>Previous</button>
                        <button type="submit" className={'btn btn-primary'} >Next</button>
                    </div>
                </form>
            </div>

        </section>
    );
}

export default AcademicInformationComponent;