import React, { useEffect } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';

const GoogleEmployeeLogin = () => {
    const handleGoogleLogin = async (googleUser) => {
        const auth2 = window.gapi.auth2;

        if (!auth2) {
            console.error('Google API client library not initialized.');
            return;
        }

        const idToken = googleUser.getAuthResponse().id_token;

        try {
            const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/login/google', { idToken });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '/';
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleGoogleFailure = (error) => { };

    useEffect(() => {
        const initGoogleAPI = async () => {
            const params = {
                client_id: "487702626826-8ja00rekqjl2ugoghjutfbppmgh46b8e.apps.googleusercontent.com",
                scope: "email",
                plugin_name: 'Gojob'
            };

            await new Promise((resolve) => window.gapi.load('auth2', resolve));
            await window.gapi.auth2.init(params);
        };

        initGoogleAPI();
    }, []);

    return (
        <GoogleButton
            onClick={() => {
                const auth2 = window.gapi.auth2;

                if (!auth2) {
                    console.error('Google API client library not initialized.');
                    return;
                }

                auth2.getAuthInstance().signIn().then(handleGoogleLogin, handleGoogleFailure);
            }}
        />
    );
};

export default GoogleEmployeeLogin;
