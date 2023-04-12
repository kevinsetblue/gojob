import React, { useState, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { RagisterSchema } from "../Schema/RagisterSchema";
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import { ColorRing } from 'react-loader-spinner'


const Ragister = ({ setUser }) => {


    const [phoneNumber, setphoneNumber] = useState('');
    const [Register, setRegister] = useState(false);
    const [NotRegisterd, setNotRegisterd] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        confirmpassword: ''
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: RagisterSchema,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/register/email', {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phoneNumber: phoneNumber,
                });
                const token = response.data.token;
                localStorage.setItem("token", token);
                action.resetForm();
                navigate('/');

            }
            catch (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setRegister(true);
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
            const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/register/google', { idToken });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user.name);
            window.location.href = '/';
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

                        <div className="h-auto p-5 bg-white border rounded-3 mt-4" style={{ 'boxShadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                            <h6 className="login-text"><b>Register</b></h6>


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

                            <p className="text-secondary" style={{ fontSize: '12px', 'textAlign': 'justify' }}>By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
                            </p>
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

                            {
                                Register ? <h5 className="text-center text-danger">Email Already registered!</h5> : null
                            }
                            {
                                NotRegisterd && !ErrorMessage ? <h5 className="text-center text-danger">Email is not Registered!</h5> : null
                            }
                            {ErrorMessage ? <h6 className="text-danger">{ErrorMessage}</h6> : null}


                            <main className="form-signin">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="exampleInputName" className="form-label">
                                        <b>Name</b>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="exampleInputName1"
                                        aria-describedby="NameHelp"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name ? <h6 className="text-danger">{errors.name}</h6> : null}
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

                                    {/* <label htmlFor="exampleInputnumber" className="form-label">
                                        <b>Phone No.</b>
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        className="form-control"
                                        id="exampleInputnumber1"
                                        aria-describedby="numberHelp"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.phoneNumber && touched.phoneNumber ? <h6 className="text-danger">{errors.phoneNumber}</h6> : null} */}

                                    <label htmlFor="exampleInputnumber" className="form-label">
                                        <b>Phone No.</b>
                                    </label>
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={values.phoneNumber}
                                        onChange={setphoneNumber}
                                        defaultCountry="US"
                                        international
                                    />
                                    {errors.phoneNumber && touched.phoneNumber ? <h6 className="text-danger">{errors.phoneNumber}</h6> : null}
                                    <label htmlFor="exampleInputPassword1" className="form-label">
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
                                    <label htmlFor="exampleInputConfirmPassword1" className="form-label">
                                        <b>Confirm Password</b>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        className="form-control"
                                        id="exampleInputConfirmPassword1"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.confirmpassword && touched.confirmpassword ? <h6 className="text-danger">{errors.confirmpassword}</h6> : null}
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
                                        Register <BsArrowRightShort />
                                    </button>
                                </form>
                            </main>
                        </div>

                    </div>

                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default Ragister;
