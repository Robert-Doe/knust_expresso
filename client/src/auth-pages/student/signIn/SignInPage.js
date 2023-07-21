import React, {useRef} from 'react';
import style from './signInPage.module.css'
import logo from "../../../assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function SignInPage(props) {
    const emailRef = useRef(null)
    const passKeyRef = useRef(null)
    const navigate = useNavigate()
    const signUpHandler = (e) => {
        console.log("Using CodeDen")
        e.preventDefault()
        // if(passKeyRef.current.value===confirmPassKeyRef.current.value){
        const email = emailRef.current.value;
        const passKey = passKeyRef.current.value;

        console.log({
            email: emailRef.current.value,
            passkey: passKeyRef.current.value
        })

        axios.post('http://localhost:65124/api/students/login', {
            email: emailRef.current.value,
            passKey: passKeyRef.current.value
        })
            .then(response => {
                console.log(response.data);
                if (response.data.token) {
                    localStorage.setItem('accessToken', response.data.token)
                }
                if (response.data.error) {
                    alert("Invalid User or Password")
                }
                if (response.data.isVerified === 1) {
                    if (response.data.student) {
                        navigate('/student/dashboard/')
                        localStorage.setItem('student', JSON.stringify(response.data.student))
                    } else {
                        navigate('/student/account-registration')
                    }
                } else if (response.data.isVerified === 0) {
                    alert("Please verify your email and come again")
                } else {
                    alert("Invalid username or passport")
                }

            })
            .catch(error => {
                // console.error(error);
                alert(error)
            });

    }


    return (
        <section className={style.loginBody}>
            <main className={style.loginContent}>
                <form onSubmit={signUpHandler} className={style.signInForm} id="passwordSignInForm">
                    <div>
                        <img src={logo} height={90} alt=""/>
                    </div>

                    <div>
                        <label className={style.label} htmlFor="Username">Email or Username</label>
                        <input className="" id="Username" ref={emailRef} name="Username" type="text"/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Password">Password</label>
                        <input id="Password" maxLength="128" ref={passKeyRef} name="Password" type="password"/>
                    </div>
                    <button type="submit" id="login" className={style.signinBtn}>Sign in</button>
                </form>
                <div className="forgot-password mt-2">
                    <Link to="/id/ForgotPassword">Forgot
                        password?</Link>
                </div>
            </main>
        </section>
    );
}

export default SignInPage;