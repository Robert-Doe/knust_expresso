import React, {useState} from 'react';
import './registration.css'
import logo from '../../../assets/logo.png'
import PersonalInformationComponent from "./PersonalInformationComponent";
import AcademicInformationComponent from "./AcademicInformationComponent";
import IdentificationInformationComponent from "./IdentificationInformationComponent";

function StudentRegistrationPage(props) {
    const [studentDetails,setStudentDetails]=useState({});
    const [step, setStep] = useState(1);

    const addStudentDetail = (newDetail) => {
        setStudentDetails((prevDetails) => ({ ...prevDetails, ...newDetail }));
        console.log(studentDetails)
        //return studentDetails;
    };
    const NumberList = ({ count }) => {
        return (
            <div className="number-list align-self-end mx-4">
                <div className={`number ${count === 1 ? 'active' : ''}`}>1</div>
                <div className={`number ${count === 2 ? 'active' : ''}`}>2</div>
                <div className={`number ${count === 3 ? 'active' : ''}`}>3</div>
            </div>
        );
    };



    const handleNext = () => {
        console.log({old:step,new:step+1})
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        console.log({old:step,new:step-1})
        setStep((prevStep) => prevStep - 1);
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return <PersonalInformationComponent studentDetails addStudentDetail={addStudentDetail} onNext={handleNext} />;
            case 2:
                return <AcademicInformationComponent studentDetails addStudentDetail={addStudentDetail} onNext={handleNext} onPrevious={handlePrevious} />;
            case 3:
                return <IdentificationInformationComponent studentDetails addStudentDetail={addStudentDetail} onPrevious={handlePrevious} />;
            default:
                return null;
        }
    };

    return (
        <section className={'registration-body'}>
            <aside className={'stepper-indicator d-flex flex-column'}>
                <div className="brand d-flex justify-content-center py-5">
                    {/*<img src={logo} height={70}/>*/}
                    <div className="logo">
                        <img src={logo} height={105}/>
                        <h2>knust<span className='danger'>Expresso</span></h2>
                    </div>
                </div>
                <NumberList count={step}/>
            </aside>
            <main className={'registration-main-content'}>
                <div>
                   {/* {renderForm()}*/}
                    {step === 1 && <PersonalInformationComponent studentDetails={studentDetails} addStudentDetail={addStudentDetail} onNext={handleNext}/>}
                    {step === 2 && <AcademicInformationComponent studentDetails={studentDetails} addStudentDetail={addStudentDetail} onNext={handleNext} onPrevious={handlePrevious}/>}
                    {step === 3 && <IdentificationInformationComponent studentDetails={studentDetails} addStudentDetail={addStudentDetail} onPrevious={handlePrevious}/>}
                </div>
            </main>
        </section>
    );
}



export default StudentRegistrationPage;