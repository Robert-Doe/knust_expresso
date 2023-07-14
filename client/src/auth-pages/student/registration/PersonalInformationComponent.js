import React, {useEffect, useRef, useState} from 'react';

function PersonalInformationComponent({onNext,addStudentDetail,studentDetails}) {
    const schoolId = useState('');
    const fNameRef = useRef(null)
    const sNameRef = useRef(null)
    const dobRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passKeyRef = useRef(null)
    const addressKeyRef = useRef(null)
    const sexRef=useRef(null)

    useEffect(()=>{
        fNameRef.current.value=studentDetails.firstName ?? ''
        sNameRef.current.value=studentDetails.lastName ?? ''
        dobRef.current.value=studentDetails.dateOfBirth ?? ''
        emailRef.current.value=studentDetails.email ?? ''
        phoneRef.current.value=studentDetails.phone ?? ''
        passKeyRef.current.value=studentDetails.passKey ?? ''
        addressKeyRef.current.value=studentDetails.address ?? ''
        sexRef.current.value=studentDetails.sex ?? ''
    },[])

    const handlePersonalInformation = (e) => {
        e.preventDefault()
        addStudentDetail({
            firstName: fNameRef.current.value,
            lastName: sNameRef.current.value,
            dateOfBirth: dobRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            passKey: passKeyRef.current.value,
            address: addressKeyRef.current.value,
            sex:sexRef.current.value
        })

        onNext()

    }

    return (
        <section>
            <div className="container mt-1 p-5">
                <form onSubmit={handlePersonalInformation}>
                    <div className={` d-flex flex-column align-items-center`}>
                        <h4 className={'font-weight-bolder'}>Personal Information</h4>
                        <p className={'m-3'}>Complete the form below with your bio data</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="fname" className={'text-dark'}>First Name</label>
                                    <input required type="text" ref={fNameRef} id={'fname'} className={'form-control'}
                                           placeholder={'Enter your given name'}/>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="sname" className={'text-dark'}>Surname</label>
                                    <input required type="text" ref={sNameRef} id={'sname'} className={'form-control'}
                                           placeholder={'Enter your surname'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className={``}>
                                    <label htmlFor="dob" className={'text-dark'}>Date of Birth:</label>
                                    <input required type="date" ref={dobRef} id={'dob'} className={'form-control'}/>
                                </div>

                            </div>
                            <div className="col-md-3">
                                <div className={``}>
                                    <label htmlFor="dob" className={'text-dark'}>Sex:</label>
                                    <select name="" ref={sexRef} id="" className={'form-control'}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="address" className={'text-dark'}>Address:</label>
                                    <input required type="text" ref={addressKeyRef} id={'address'} className={'form-control'}
                                           placeholder={'Address'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="phone" className={'text-dark'}>Phone:</label>
                                    <input required type="tel" ref={phoneRef} id={'phone'} className={'form-control'}
                                           placeholder={'Enter your phone number'}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="email" className={'text-dark'}>E-mail:</label>
                                    <input required type="email" ref={emailRef} id={'email'} className={'form-control'}
                                           placeholder={'Enter your email'}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="passkey" className={'text-dark'}>Password:</label>
                                    <input required type="password" ref={passKeyRef} id={'passkey'}
                                           className={'form-control'}
                                           placeholder={'Passkey'}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={``}>
                                    <label htmlFor="passkey" className={'text-dark'}>Confirm Password:</label>
                                    <input required type="password" ref={passKeyRef} id={'passkey'}
                                           className={'form-control'}
                                           placeholder={'Passkey'}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 d-flex justify-content-end mt-5 ">
                        <button className='btn btn-primary' type="submit" >Next</button>
                    </div>
                </form>
            </div>

        </section>
    );
}

export default PersonalInformationComponent;