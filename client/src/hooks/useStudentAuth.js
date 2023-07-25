import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function useStudentAuth() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        // Function to check the authenticity and expiration of the access token
        const checkAuth = () => {
            if (!accessToken) {
                // Access token is missing, redirect to login page
                navigate('/signin');
            } else{
                axios.post('http://localhost:9999/api/student/token-verification',
                    {token: localStorage.getItem('accessToken')}).then(response => {
                    if(response.status!==200){
                        navigate('/sign');
                    }
                }).catch(err=>{
                    navigate('/login');
                })
            }
        };

        checkAuth(); // Initial check on component mount
    }, [accessToken, navigate]);

    return null; // Custom hook doesn't render any UI
}

export default useStudentAuth