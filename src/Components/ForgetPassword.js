import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useFormik } from 'formik';
import { ForgetPasswordScema } from "../Schema/ForgetPasswordSchema";
import axios from "axios";
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {

    const nevigate = useNavigate();

    const initialValues = {
        email: '',
    }

    const [Successfullysent, setSuccessfullysent] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
    const [Loader, setLoader] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ForgetPasswordScema,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const response = await axios.post('https://gojob-x5qp.onrender.com/api/employee/forgotpassword', {
                    email: values.email
                })
                console.log(response);
                setSuccessfullysent(true);
                action.resetForm();
                nevigate('/signin')
                setLoader(false);
            }
            catch (error) {
                console.log(error);
                if (error.response.data.error) {
                    setPasswordError(error.response.data.error);
                    setLoader(false);
                }
            }
            action.resetForm();
        }
    });



    return (
        <>
            <div className="container password-forget mt-5">
                <div className="row">
                    <div className="col-md-3"></div>

                    <div className="col-md-6">

                        <div className="logo text-center">
                            <img src="img/Gojob.png" alt="" width={70} height={35} />
                        </div>

                        <div className="p-5 mb-4 bg-white rounded-3 mt-3" style={{ 'boxShadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                            <h6 className="text-start">Forget Password?</h6>
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
                            <form className="mt-5" onSubmit={handleSubmit}>
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
                                <button
                                    className="w-100 btn btn-primary mt-3"
                                    type="submit"
                                >
                                    Submit <BsArrowRightShort />
                                </button>
                                {
                                    Successfullysent ? <h6 className="text-center text-danger">New Password Sent to Mail Successfully.</h6> : null
                                }

                                {
                                    PasswordError ? <h6 className="text-center text-success mt-3">{PasswordError}</h6> : null
                                }
                            </form>
                        </div>
                    </div>

                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
