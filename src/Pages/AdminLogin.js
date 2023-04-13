import React, { useState } from "react";
import { useFormik } from 'formik';
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../Pages/SignIn.css';
import axios from 'axios';

import { ColorRing } from 'react-loader-spinner'
import { Adminloginschema } from "../Schema/Adminloginschema";

const AdminLogin = ({ setUser, setGoogleUser }) => {


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
        validationSchema: Adminloginschema,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const response = await axios.post('https://gojob-x5qp.onrender.com/api/admin/login', {
                    email: values.email,
                    password: values.password
                });
                const token = response.data.token;
                localStorage.setItem("admintoken", token);
                localStorage.setItem("adminuser", JSON.stringify(response.data.user))
                // setUser(response.data.user.name);
                action.resetForm();
                navigate('/jobseeker');
            }
            catch (error) {
                console.error(error);
                if (error.response && error.response.status === 400) {
                    if (error.response.data.error) {
                        setNotRegisterd(error.response.data.error);
                        setErrorMessage(error.response.data.message);
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

                                    <hr />

                                    <main className="form-signin">
                                        <form onSubmit={handleSubmit}>
                                            {
                                                NotRegisterd ? <h5 className="text-center text-danger">{NotRegisterd}</h5> : null
                                            }

                                            {/* {ErrorMessage ? <h6 className="text-danger">{ErrorMessage}</h6> : null} */}

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

export default AdminLogin;
