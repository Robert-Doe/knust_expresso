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
import LecturerSignInPage from "./auth-pages/lecturer/signIn/lecturerSigninPage";
import ProficiencySignInPage from "./auth-pages/proficiency/signIn/proficiencySigninPage";
import DepartmentSignInPage from "./auth-pages/department/signIn/departmentSignInPage";
import StudentDashboard from "./auth-pages/student/dashboard/StudentDashboard";
import LecturerDashboard from "./auth-pages/lecturer/dashboard/LecturerDashboard";
import EnglishProficiencyRequestPage from "./auth-pages/student/proficiency-request/EnglishProficiencyRequestPage";
import LoginGridPage from "./pages/LoginGridPage";
import ReferenceRequestDetailsPage from "./auth-pages/lecturer/details/ReferenceRequestDetailsPage";
import {AuthProvider} from "./hooks/AuthContext";
import RequestDetailsPage from "./auth-pages/student/dashboard/RequestDetailsPage";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Home/>}/>
                    <Route path='/student/account-registration' exact element={<StudentRegistrationPage/>}/>
                    <Route path='/verification/:token' exact element={<EmailVerificationPage/>}/>
                    <Route path='/student/internship-request' exact element={<InternshipRequestPage/>}/>
                    <Route path='/student/reference-request' exact element={<ReferenceRequestPage/>}/>
                    <Route path='/student/proficiency-request' exact element={<EnglishProficiencyRequestPage/>}/>
                    <Route path="/student/request/:requestId" element={<RequestDetailsPage/>} />
                    <Route path='/signin/' exact element={<LoginGridPage/>}/>
                    <Route path='/signup/student/' exact element={<SignUpPage/>}/>
                    <Route path='/signin/student/' exact element={<SignInPage/>}/>
                    <Route path='/signin/lecturer/' exact element={<LecturerSignInPage/>}/>
                    <Route path='/signin/proficiency/' exact element={<ProficiencySignInPage/>}/>
                    <Route path='/signin/department/' exact element={<DepartmentSignInPage/>}/>
                    <Route path='/student/dashboard/' exact element={<StudentDashboard/>}/>
                    <Route path='/lecturer/dashboard/' exact element={<LecturerDashboard/>}/>
                    <Route path='/lecturer/reference-requests/:requestId' exact element={<ReferenceRequestDetailsPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}
export default App
