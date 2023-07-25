import React from 'react';
import style from './signInPage.module.css'
import logo from "../../assets/logo.png";
 import {Link} from "react-router-dom";

function SignInPage(props) {
    return (
        <section className={style.loginBody}>
            <main className={style.loginContent}>
                <form action="/id" className={style.signInForm} id="passwordSignInForm" method="post">
                    <div>
                        <img src={logo} height={90} alt=""/>
                    </div>

                    <div>
                        <label className={style.label} htmlFor="Username">Email or Username</label>
                        <input className="" id="Username" name="Username" type="text"/>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="Password">Password</label>
                        <input id="Password" maxLength="128" name="Password" type="password"/>
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

export default SignInPage;