import React from 'react';
import style from "./popUp.module.css";
import knustLogo from '../../../assets/logo.png'


function StudentEmailVerificationPage(props) {
    return (
        <section className={style.loginBody}>
            <h4 className={`text-center ${style.pageTitle}`}>Verify Email Address</h4>
            <main className={style.loginContent}>
                <form action="/id" className={`${style.signInForm} py-3`} id="passwordSignInForm" method="post">
                    <img src={knustLogo} width={120} alt={''}/>
                    <p className={style.verifyInstruction}>Click the link below to verify
                        your KNUST institutional email address</p>
                    <p className={style.verifyInstruction2}>
                        Please check your spam folder, if you
                        can’t find it in your inbox
                    </p>
                    <button type="submit" id="login" className={`${style.verifyBtn}`}>Sign Up</button>
                </form>
            </main>
        </section>
    );
}

export default StudentEmailVerificationPage;