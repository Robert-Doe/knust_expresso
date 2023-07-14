import React, {useRef} from 'react';
import style from './signUp.module.css'
import axios from 'axios';
import knustLogo from '../../../assets/logo.png'


function SignUpPage(props) {
    const emailRef=useRef(null);
    const passKeyRef=useRef(null)
    const confirmPassKeyRef=useRef(null)

    const signUpHandler=(e)=>{
        console.log("Using CodeDen")
        e.preventDefault()
       // if(passKeyRef.current.value===confirmPassKeyRef.current.value){
        const passKey=passKeyRef.current.value;
        const rePassKey=confirmPassKeyRef.current.value;
        if(passKey===rePassKey){
            console.log({
                email:emailRef.current.value,
                passkey:passKeyRef.current.value
            })

            axios.post('http://localhost:65124/api/students/account-registration', {
                email:emailRef.current.value,
                passKey:passKeyRef.current.value
            })
                .then(response => {
                    console.log(response.data);
                    if(response.data.error){
                        alert(response.data.error)
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert(error)
                });
        }else{
            alert("Notice: Unmatching passwords")
        }

    }


    return (
        <section className={style.loginBody}>
            <main className={style.loginContent}>

                <form onSubmit={signUpHandler} className={`${style.signInForm}`} id="passwordSignInForm" >
                   {/* <img src={logo}  alt=""/>*/}
                    <div className="">
                        <img src={knustLogo} height={'100px'} alt=""/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Username">Email or Username</label>
                        <input  id="Username" ref={emailRef} name="Username" type="text" required/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Password">Password</label>
                        <input  id="Password" ref={passKeyRef} maxLength="128" name="Password" type="password" required/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Password">Confirm Password</label>
                        <input  id="Password" ref={confirmPassKeyRef} maxLength="128" name="Password" type="password" required/>
                    </div>
                    <button type="submit" id="login" className={style.signinBtn}>Sign Up</button>
                </form>

            </main>
        </section>
    );
}

export default SignUpPage;