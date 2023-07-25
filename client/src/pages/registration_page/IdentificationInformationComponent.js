import React, {useRef, useState} from 'react';

function IdentificationInformationComponent({onPrevious}) {
    const schoolId = useState('');
    const fNameRef = useRef(null)
    const sNameRef = useRef(null)
    const dobRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passKeyRef = useRef(null)
    const addressKeyRef = useRef(null)
    const bioRef = useRef(null)

    return (
        <section>
            <div className="container mt-1 p-5">
                <form action="#">
                    <div className={` d-flex flex-column align-items-center`}>
                        <h4 className={'font-weight-bolder'}>Identification Information</h4>
                        <p className={'m-3'}>Complete the form below with your bio data</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="fname" className={'text-dark'}>First Name</label>
                                    <input type="text" ref={fNameRef} id={'fname'} className={'form-control'}
                                           placeholder={'Enter your given name'}/>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="sname" className={'text-dark'}>Surname</label>
                                    <input type="text" ref={sNameRef} id={'sname'} className={'form-control'}
                                           placeholder={'Enter your surname'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className={``}>
                                    <label htmlFor="dob" className={'text-dark'}>Date of Birth:</label>
                                    <input type="date" ref={dobRef} id={'dob'} className={'form-control'}/>
                                </div>

                            </div>
                            <div className="col-md-3">
                                <div className={``}>
                                    <label htmlFor="dob" className={'text-dark'}>Sex:</label>
                                    <select name="" id="" className={'form-control'}>
                                        <option value="male">Male</option>
                                        <option value="male">Female</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="address" className={'text-dark'}>Address:</label>
                                    <input type="text" ref={addressKeyRef} id={'address'} className={'form-control'}
                                           placeholder={'Address'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="phone" className={'text-dark'}>Phone:</label>
                                    <input type="tel" ref={phoneRef} id={'phone'} className={'form-control'}
                                           placeholder={'Enter your phone number'}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="email" className={'text-dark'}>E-mail:</label>
                                    <input type="email" ref={emailRef} id={'email'} className={'form-control'}
                                           placeholder={'Enter your email'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="passkey" className={'text-dark'}>Password:</label>
                                    <input type="password" ref={passKeyRef} id={'passkey'}
                                           className={'form-control'}
                                           placeholder={'Passkey'}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="passkey" className={'text-dark'}>Confirm Password:</label>
                                    <input type="password" ref={passKeyRef} id={'passkey'}
                                           className={'form-control'}
                                           placeholder={'Passkey'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={``}>
                                    <label htmlFor="schoolId" className={'text-dark'}>Bio (Description):</label>
                                    <textarea name="bio" id="bio" cols="30" rows="3"
                                              className={'form-control'} ref={bioRef}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` mt-3 d-flex justify-content-end`}>
                        <input type="submit" className={'btn btn-warning '}
                               value={'Save'}/>
                    </div>
                    <div className="w-100 d-flex justify-content-between">
                        <button type="button" onClick={onPrevious}>Previous</button>
                        <button type="button" >Submit</button>
                    </div>
                </form>
            </div>

        </section>
    );
}

export default IdentificationInformationComponent;