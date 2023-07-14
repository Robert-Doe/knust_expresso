import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/home_page/Home";
import './App.css';
import StudentRegistrationPage from "./auth-pages/student/registration/StudentRegistrationPage";
import EmailVerificationPage from "./pages/email-verification/EmailVerificationPage";
import InternshipRequestPage from "./auth-pages/student/internship-request/InternshipRequestPage";
import ReferenceRequestPage from "./auth-pages/student/reference-request/ReferenceRequestPage";
import SignUpPage from "./auth-pages/student/signUp/SignUpPage";
import SignInPage from "./auth-pages/student/signIn/SignInPage";
import Dashboard from "./auth-pages/student/dashboard/Dashboard";
import EnglishProficiencyRequestPage from "./auth-pages/student/proficiency-request/EnglishProficiencyRequestPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/student/account-registration' exact element={<StudentRegistrationPage/>}/>
                <Route path='/verification/:token' exact element={<EmailVerificationPage/>}/>
                <Route path='/internship-request' exact element={<InternshipRequestPage/>}/>
                <Route path='/reference-request' exact element={<ReferenceRequestPage/>}/>
                <Route path='/proficiency-request' exact element={<EnglishProficiencyRequestPage/>}/>
                <Route path='/signup/student/' exact element={<SignUpPage/>}/>
                <Route path='/signin/student/' exact element={<SignInPage/>}/>
                <Route path='/student/dashboard/' exact element={<Dashboard/>}/>
            </Routes>
        </Router>
    )
}
export default App
