import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmployersSignInGoJobSchema } from "../Schema/EmployerSignInSchema";
import GoogleButton from 'react-google-button';
import { ColorRing } from 'react-loader-spinner'

const EmployerSignIn = ({ setEmployerUser }) => {


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
        validationSchema: EmployersSignInGoJobSchema,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const response = await axios.post(
                    'https://gojob-x5qp.onrender.com/api/employer/login/email', {
                    email: values.email,
                    password: values.password
                });
                const token = response.data.token;
                localStorage.setItem("token", token);
                alert('User Login Successfully');
                setEmployerUser(response.data.user.name);
                action.resetForm();
                navigate('/employerspostjob');
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





    const handleGoogleLogin = async (googleUser) => {
        const auth2 = window.gapi.auth2;

        if (!auth2) {
            console.error('Google API client library not initialized.');
            return;
        }

        const idToken = googleUser.getAuthResponse().id_token;

        try {
            const response = await axios.post('https://gojob-x5qp.onrender.com/api/employer/login/google', { idToken });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setEmployerUser(response.data.user.name);
            // window.location.href = '/';
            navigate('/employerspostjob');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error) {
                    setNotRegisterd(false);
                    setErrorMessage(error.response.data.error);
                }
            }
            else {
                setNotRegisterd(true);
            }
            // window.location.href = '/signin';
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

                                    <p className="text-secondary" style={{ fontSize: '12px' }}>By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.</p>
                                    <div className="Ragister text-center mt-3">
                                        <Link to='/employerregister'>
                                            <button type="button" className="btn btn-link text-sm-center text-decoration-none">
                                                if you are new user then Register
                                            </button>
                                        </Link>
                                    </div>

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
                                            {/* {
                                                NotRegisterd && !ErrorMessage ? <h5 className="text-center text-danger">Email is not Registered!</h5> : null
                                            } */}

                                            {ErrorMessage ? <h6 className="text-danger">{ErrorMessage}</h6> : null}

                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                <b>Email address</b>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
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

export default EmployerSignIn;
