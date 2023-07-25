/*
import React, { useEffect, useState } from 'react';
import { RiLoader4Line, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import './email-verification.css'
const EmailVerificationPage = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const { token } = useParams();

    useEffect(() => {
        if (token) {
            verifyEmailToken(token)
                .then((response) => {
                    if (response.success) {
                        setVerificationStatus('verified');
                    } else {
                        setVerificationStatus('invalid');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setVerificationStatus('error');
                });
        } else {
            setVerificationStatus('invalid');
        }
    }, [token]);

    const verifyEmailToken = (token) => {
        // Perform API call to verify the email token
        // You would replace this with your own API endpoint

        return fetch(`https://knustexpresso.codeden.org/api/students/verify/${token}`)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                throw new Error('Error verifying email token');
            });
    };

    const getStatusIcon = () => {
        switch (verificationStatus) {
            case 'verifying':
                return <RiLoader4Line size={100} className="icon verifying" />;
            case 'verified':
                return <RiCheckLine size={100} className="icon verified" />;
            case 'invalid':
                return <RiCloseLine size={100} className="icon invalid" />;
            case 'error':
                return <RiCloseLine size={100} className="icon error" />;
            default:
                return null;
        }
    };

    return (
        <div className="verification-page">
            <div className="status-icon">{getStatusIcon()}</div>
            <div className="status-message">
                {verificationStatus === 'verifying' && <p>Verifying email...</p>}
                {verificationStatus === 'verified' && <p>Email verification successful!</p>}
                {verificationStatus === 'invalid' && <p>Invalid email verification token.</p>}
                {verificationStatus === 'error' && <p>An error occurred during email verification.</p>}
            </div>
        </div>
    );
};

export default EmailVerificationPage;
*/


import React, { useEffect, useState } from 'react';
import { RiLoader4Line, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import './email-verification.css';

const EmailVerificationPage = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const { token } = useParams();

    useEffect(() => {
        if (token) {
            verifyEmailToken(token)
                .then((response) => {
                    if (response.success) {
                        setVerificationStatus('verified');
                    } else {
                        setVerificationStatus('invalid');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setVerificationStatus('error');
                });
        } else {
            setVerificationStatus('invalid');
        }
    }, [token]);

    const verifyEmailToken = (token) => {
        // Perform API call to verify the email token
        // Replace the API endpoint below with your own endpoint
        return fetch(`https://knustexpresso.codeden.org/api/students/verify/${token}`)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                throw new Error('Error verifying email token');
            });
    };

    const getStatusIcon = () => {
        switch (verificationStatus) {
            case 'verifying':
                return <RiLoader4Line size={100} className="icon verifying" />;
            case 'verified':
                return <RiCheckLine size={100} className="icon verified" />;
            case 'invalid':
                return <RiCloseLine size={100} className="icon invalid" />;
            case 'error':
                return <RiCloseLine size={100} className="icon error" />;
            default:
                return null;
        }
    };

    return (
        <div className="verification-page">
            <div className="status-icon">{getStatusIcon()}</div>
            <div className="status-message">
                {verificationStatus === 'verifying' && <p>Verifying email...</p>}
                {verificationStatus === 'verified' && (
                    <>
                        <p className="verification-successful">Verification Successful</p>
                        <p>
                            Your account has been successfully verified. You can now log in and access all the features and
                            functionalities.
                        </p>
                        <p>If you have any questions or need further assistance, please contact our support team.</p>
                        <a href="/login" className="login-button">Go to Login</a>
                    </>
                )}
                {verificationStatus === 'invalid' && <p>Invalid email verification token.</p>}
                {verificationStatus === 'error' && <p>An error occurred during email verification.</p>}
            </div>
        </div>
    );
};

export default EmailVerificationPage;
