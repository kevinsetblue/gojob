import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { SignInGoJob } from "../Schema/Index";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import '../Pages/SignIn.css';
import GoogleEmployeeLogin from "../Components/GoogleEmployeeLogin";
import axios from 'axios';
import GoogleButton from 'react-google-button';
// import GoogleButton from 'react-google-button'

import { ColorRing } from 'react-loader-spinner'

const SignIn = ({ setUser, setGoogleUser }) => {

    const initialValues = {
        email: '',
        password: ''
    }

    const navigate = useNavigate();

    const [NotRegisterd, setNotRegisterd] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Loader, setLoader] = useState(false);


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: SignInGoJob,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/login/email', {
                    email: values.email,
                    password: values.password
                });
                const token = response.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setUser(response.data.user.name);
                action.resetForm();
                navigate('/');
            }
            catch (error) {
                console.error(error);
                if (error.response && error.response.status === 400) {
                    if (error.response.data.error) {
                        setNotRegisterd(false);
                        setErrorMessage(error.response.data.error);
                        setLoader(false);
                    }
                }
                else {
                    setNotRegisterd(true);
                    setLoader(false);
                }
            }
        }
    });


    // const handleGoogleLogin = async () => {
    //     try {
    //         const response = await axios.get('http://10.10.10.29:3000/api/auth/google');
    //         GoogleLoginCallback();
    //         window.location.href = response.data.redirectUrl;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const GoogleLoginCallback = () => {
    //     useEffect(() => {
    //         const urlSearchParams = new URLSearchParams(window.location.search);
    //         const params = Object.fromEntries(urlSearchParams.entries());

    //         axios.post('http://10.10.10.29:3000/api/auth/google/callback', params)
    //             .then(response => {
    //                 // localStorage.setItem('token', response.data.token);
    //                 // localStorage.setItem('user', JSON.stringify(response.data.user));
    //                 const token = response.data.token;
    //                 localStorage.setItem("token", token);
    //                 localStorage.setItem("user", JSON.stringify(response.data.user))
    //                 window.location.href = '/';
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 window.location.href = '/signin';
    //             });
    //     }, []);
    // }




    const handleGoogleLogin = async (googleUser) => {
        const auth2 = window.gapi.auth2;
        setLoader(true);
        if (!auth2) {
            console.error('Google API client library not initialized.');
            return;
        }

        const idToken = googleUser.getAuthResponse().id_token;

        try {
            const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/login/google', { idToken });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user.name);
            navigate('/')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error) {
                    setNotRegisterd(false);
                    setErrorMessage(error.response.data.error);
                    setLoader(false);
                }
            }
            else {
                setNotRegisterd(true);
            }
        }
    };

    const handleGoogleFailure = (error) => {

    };




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
        <>
            <div className="container sign-in">
                <div className="row">
                    <div className="col-md-3"></div>

                    <div className="col-md-6">

                        <h1 className="h3 mb-3 fw-normal text-center mt-3">
                            <img src="img/Gojob.png" alt="" width={70} height={35} />
                        </h1>

                        <div className="container login-form">
                            <div className="box-shadow">
                                <div className="h-auto p-5 bg-white rounded-pill mt-4">
                                    <h6 className="login-text"><b>Login</b></h6>

                                    <div className="loader-center text-center">
                                        {
                                            Loader ? <ColorRing
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['black']}
                                            />
                                                : null
                                        }
                                    </div>


                                    <p className="text-secondary" style={{ fontSize: '12px', 'textAlign': 'justify' }}>By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.</p>
                                    <div className="Ragister text-center mt-3">
                                        <Link to='/ragister'>
                                            <button type="button" className="btn btn-link text-sm-center text-decoration-none">
                                                if you are new user then Register
                                            </button>
                                        </Link>
                                    </div>
                                    {/* <a
                                        className="btn btn-secondary bg-white text-black w-100 btn-block mt-4"
                                        onClick={handleGoogleLogin}
                                        style={{ backgroundColor: "#3b5998" }}
                                        href="https://gojob-x5qp.onrender.com/api/employee/login/auth/google"
                                        role="button"
                                    >
                                        <FcGoogle className="me-2" style={{ fontSize: '20px' }} />
                                        Continue with Google
                                    </a> */}
                                    {/* <GoogleButton
                                        onClick={() => {
                                            const auth2 = window.gapi.auth2.getAuthInstance();
                                            auth2.signIn().then(handleGoogleLogin, handleGoogleFailure);
                                        }}
                                    /> */}

                                    {/* <GoogleEmployeeLogin /> */}
                                    <div className="google-button d-flex justify-content-center">
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
                                    </div>

                                    <hr />

                                    <main className="form-signin">
                                        <form onSubmit={handleSubmit}>
                                            {
                                                NotRegisterd ? <h5 className="text-center text-danger">Email is not Registered!</h5> : null
                                            }

                                            {ErrorMessage ? <h6 className="text-danger">{ErrorMessage}</h6> : null}

                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                <b>Email address</b>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                // aria-describedby="emailHelp"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email ? <h6 className="text-danger">{errors.email}</h6> : null}

                                            <label htmlFor="exampleInputPassword1" className="form-label mt-3">
                                                <b>Password</b>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                autoComplete="off"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            {errors.password && touched.password ? <h6 className="text-danger">{errors.password}</h6> : null}

                                            <div className="forgetpass text-center mt-3">
                                                <Link to='/forgetpassword'>
                                                    <button type="button" className="btn btn-link text-sm-center text-decoration-none">
                                                        Forget Password?
                                                    </button>
                                                </Link>
                                            </div>
                                            <button
                                                className="w-100 btn btn-primary mt-3"
                                                type="submit"
                                            >
                                                Login <BsArrowRightShort className="BsArrowRightShort" />
                                            </button>
                                        </form>
                                    </main>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
