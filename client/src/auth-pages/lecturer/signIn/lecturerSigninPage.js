import React, {useRef} from 'react';
import style from './signInPage.module.css'
import logo from "../../../assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function LecturerSigninPage(props) {
    const staffIdRef=useRef(null)
    const passKeyRef=useRef(null)
    const navigate=useNavigate()
    const signUpHandler=(e)=>{
        console.log("Using CodeDen")
        e.preventDefault()
        // if(passKeyRef.current.value===confirmPassKeyRef.current.value){
        const staffId=staffIdRef.current.value;
        const passKey=passKeyRef.current.value;

            console.log({
                staffId:staffIdRef.current.value,
                passKey:passKeyRef.current.value
            })

            axios.post('http://localhost:65124/api/lecturers/login', {
                staffId:staffIdRef.current.value,
                passKey:passKeyRef.current.value
            })
                .then(response => {
                   console.log(response.data);
                    if(response.data.token){
                        localStorage.setItem('accessToken',response.data.token)
                    }else{
                        alert(response.data.msg)
                    }
                    if(response.data.error){
                        alert("Invalid User or Password")
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
                        <label className={style.label} htmlFor="Username">Staff ID:</label>
                        <input className="" id="Username" ref={staffIdRef} name="Username" type="text"/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Password">Password:</label>
                        <input id="Password" maxLength="128" ref={passKeyRef} name="Password" type="password"/>
                    </div>
                    <button type="submit" id="login" className={style.signinBtn}>Sign in</button>
                </form>
                <div className="forgot-password mt-2">
                    <Link to="/id/ForgotPassword" >Forgot
                        password?</Link>
                </div>
            </main>
        </section>
    );
}

export default LecturerSigninPage;