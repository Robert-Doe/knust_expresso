import React, {useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function IdentificationInformationComponent({onPrevious, addStudentDetail, studentDetails}) {
    const idNumberRef = useRef(null);
    const idTypeRef = useRef(null);
    const navigate= useNavigate()

    function handleIdentityInformation(e) {
        e.preventDefault()
        addStudentDetail({
            idType: idTypeRef.current.value,
            idNumber: idNumberRef.current.value
        })
        const newDetails = {
            ...studentDetails, idType: idTypeRef.current.value,
            idNumber: idNumberRef.current.value
        }

        localStorage.setItem('student',JSON.stringify(newDetails))

        axios.post('https://knustexpresso.codeden.org/api/students/', newDetails)
            .then(r =>{
                if(r.data){
                    navigate('/student/dashboard')
                }
        }).catch(err=>alert("Error saving Information"))

        console.log(newDetails)
    }

    return (
        <section>
            <div className="container mt-1 p-5">
                <form onSubmit={handleIdentityInformation}>
                    <div className={` d-flex flex-column align-items-center`}>
                        <h4 className={'font-weight-bolder'}>Identification Information</h4>
                        <p className={'m-3'}>Complete the form below with your bio data</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="graduateType">Type of Identification </label>
                                <select id="graduateType" ref={idTypeRef} className="form-control">
                                    <option value="">Select an option</option>
                                    <option value="National ID card">National ID card</option>
                                    <option value="Health Insurance">Health Insurance</option>
                                    <option value="Voters ID card">Voters ID card</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="fname" className={'text-dark'}>Identification Card Number</label>
                                    <input type="text" ref={idNumberRef} id={'icardNumber'} className={'form-control'}
                                           placeholder={'Enter your given name'}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 d-flex justify-content-between mt-5">
                        <button type="button" className={'btn btn-primary'} onClick={onPrevious}>Previous</button>
                        <button type="submit" className={'btn btn-primary'}>Submit</button>
                    </div>
                </form>
            </div>

        </section>
    );
}

export default IdentificationInformationComponent;