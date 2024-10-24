import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();

        // If token doesn't exist or has expired, redirect to login
        if (!token || currentTime > tokenExpiration) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;
