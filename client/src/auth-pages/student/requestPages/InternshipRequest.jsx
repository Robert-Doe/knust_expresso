import React from 'react';
import './intenship.css';
import './../registration/registration.css'


function InternshipRequest(props) {
    return (
        <div className='ibody'>
            <div className="internship-container container mt-1 p-5">
                <form action="">
                    <h2>Internship Letter Request</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={``}>
                                <label htmlFor="fname" className={'text-dark'}>Full Name</label>
                                <input type="text" id={'fname'} className={'form-control'}
                                       placeholder={'Enter your full name'}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={``}>
                                <label htmlFor="fname" className={'text-dark'}>School ID</label>
                                <input type="text" id={'fname'} className={'form-control'}
                                       placeholder={'Enter your school ID'}/>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="admissionYear">School Year</label>
                            <select id="admissionYear" className="form-control">
                                <option value="">Select an option</option>
                                <option value="option1">Level 100</option>
                                <option value="option2">Level 200</option>
                                <option value="option3">Level 300</option>
                            </select>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="graduateType">Department</label>
                            <select id="graduateType" className="form-control">
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className={``}>
                                <label htmlFor="sname" className={'text-dark'}>Email</label>
                                <input type="text" id={'sname'} className={'form-control'}
                                       placeholder={'Enter a valid Email'}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="programme">Delivery Mode</label>
                            <select id="programme" className="form-control">
                                <option value="">Select an option</option>
                                <option value="option1">Email</option>
                                <option value="option2">Email and HardCopy</option>
                                <option value="option3">Hard Copy</option>
                                <option value="option3">WES Secure Digital</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="graduationYear">Graduation </label>
                            <select id="graduationYear" className="form-control">
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={``}>
                                <label htmlFor="fname" className={'text-dark'}>Contact</label>
                                <input type="text" id={'fname'} className={'form-control'}
                                       placeholder={'Enter your valid phone number'}/>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className={``}>
                                <label htmlFor="sname" className={'text-dark'}>Postal Address</label>
                                <input type="text" id={'sname'} className={'form-control'}
                                       placeholder={'Enter your postal address'}/>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default InternshipRequest;