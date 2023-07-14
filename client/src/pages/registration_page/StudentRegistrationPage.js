import React, {useState} from 'react';
import './registration.css'
import logo from '../../assets/logo.png'
import PersonalInformationComponent from "./PersonalInformationComponent";
import AcademicInformationComponent from "./AcademicInformationComponent";
import IdentificationInformationComponent from "./IdentificationInformationComponent";

function StudentRegistrationPage(props) {

    const NumberList = ({ count }) => {
        return (
            <div className="number-list align-self-end mx-4">
                <div className={`number ${count === 1 ? 'active' : ''}`}>1</div>
                <div className={`number ${count === 2 ? 'active' : ''}`}>2</div>
                <div className={`number ${count === 3 ? 'active' : ''}`}>3</div>
            </div>
        );
    };

    const [step, setStep] = useState(1);

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
                return <PersonalInformationComponent onNext={handleNext} />;
            case 2:
                return <AcademicInformationComponent onNext={handleNext} onPrevious={handlePrevious} />;
            case 3:
                return <IdentificationInformationComponent onPrevious={handlePrevious} />;
            default:
                return null;
        }
    };

    return (
        <section className={'registration-body'}>
            <aside className={'stepper-indicator d-flex flex-column'}>
                <div className="brand d-flex justify-content-center py-5">
                    <img src={logo} height={70}/>
                </div>
                <NumberList count={step}/>
            </aside>
            <main className={'main-content'}>
                <div>
                   {/* {renderForm()}*/}
                    {step === 1 && <PersonalInformationComponent onNext={handleNext}/>}
                    {step === 2 && <AcademicInformationComponent onNext={handleNext} onPrevious={handlePrevious}/>}
                    {step === 3 && <IdentificationInformationComponent onPrevious={handlePrevious}/>}
                </div>
            </main>
        </section>
    );
}



export default StudentRegistrationPage;