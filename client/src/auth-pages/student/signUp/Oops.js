import React from 'react';
import style from "./popUp.module.css";
import knustLogo from '../../../assets/logo-v.png'


function OopsPage(props) {
    return (
        <section className={style.loginBody}>
            <h4 className={`text-center ${style.pageTitle}`}>Oops</h4>
            <main className={style.loginContent}>
                <form action="/id" className={`${style.signInForm} `} id="passwordSignInForm" method="post">
                    <img src={knustLogo} width={'120px'} alt={''}/>
                    <p className={style.verifyInstruction}>The email address
                        gracealiko08@gmail.com has an
                        account already on the system.</p>
                    <p className={style.verifyInstruction2}>
                        Reset your password if you have forgotten
                    </p>
                    <button type="submit" id="login" className={`${style.verifyBtn}`}>Reset Password</button>
                </form>
            </main>
        </section>
    );
}

export default OopsPage;