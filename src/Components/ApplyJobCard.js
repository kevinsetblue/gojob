import React, { useState } from "react";
import 'reactjs-popup/dist/index.css';
import 'react-phone-number-input/style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import './ApplyJobCard.css';
import { Applyjobresume } from "../Schema/Applyjobschema";
import { ColorRing } from 'react-loader-spinner';

const ApplyJobCard = ({ SelectJob }) => {

    const initialValues = {
        Name: '',
        Email: '',
        phone: '',
        Upload: '',
    }

    const [Success, setSuccess] = useState(false);
    const [Loader, setLoader] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: Applyjobresume,
        onSubmit: async (values, action) => {
            setLoader(true);
            try {
                const formData = new FormData();
                formData.append('jobId', jobId);
                formData.append('name', values.Name);
                formData.append('email', values.Email);
                formData.append('contactno', values.phone);
                formData.append('resume', values.Upload);
                const GetToken = localStorage.getItem("token");
                await axios.post(`https://gojob-x5qp.onrender.com/api/jobapply`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': GetToken
                    }
                })
                    .then(Response => {
                        setJobId("");
                        setSuccess(Response.data.message);
                        setLoader(false);
                        action.resetForm();
                    });
            }
            catch (error) {
                if (error.response.data.error) {
                    setApplyMessage(error.response.data.error)
                }
            }
        }
    })


    const handleApply = (jobId) => {
        handleSubmit();
        setJobId(jobId);
    }

    const [jobId, setJobId] = useState("");
    const [ApplyMessage, setApplyMessage] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);

    const handleCheckboxClick = () => {
        setPopupVisible(true);
    }

    const navigate = useNavigate();
    const notify = (message) => toast(message);

    const NEWApply = () => {
        const RemoveToken = localStorage.getItem("token");
        handleCheckboxClick();
        if (!RemoveToken) {
            navigate('/signin');
            notify('Please Login');
        }
    }



    return (
        <>

            {
                SelectJob && <div className="modal-dialog position-sticky" role="document" style={{ 'top': '15px' }}>
                    <div className="modal-content shadow border-0" style={{ borderRadius: '14px' }}>
                        <div className="modal-body p-5">
                            <>
                                <h6 className="fw-bold mb-2">{SelectJob.jobTitle}</h6>
                                <h6 className="text-secondary mt-2">Remote</h6>
                                <button className="btn btn-primary rounded-pill" onClick={NEWApply}> Apply Now </button>
                                {
                                    popupVisible && (
                                        <div className="popup">
                                            <div className="container blue-pop">
                                                <h5 className="mb-2"><b>Appy For A Job</b></h5>

                                                {Success ? <h4 className="text-success">{Success}</h4> : null}

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
                                                <form onSubmit={handleSubmit}>
                                                    <input
                                                        type="hidden"
                                                        name="jobId"
                                                        value={jobId}
                                                    />
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start d-flex">
                                                            Name
                                                        </label>

                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="Name"
                                                            value={values.Name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            aria-label="default input example"
                                                        />
                                                        {errors.Name && touched.Name ? <h6 className="text-danger">{errors.Name}</h6> : null}
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start d-flex">
                                                            Email
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            name="Email"
                                                            value={values.Email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            aria-label="default input example"
                                                        />
                                                        {errors.Email && touched.Email ? <h6 className="text-danger">{errors.Email}</h6> : null}
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="exampleInputnumber" className="form-label">
                                                            <b>Phone No.</b>
                                                        </label>

                                                        <input
                                                            className="form-control"
                                                            type="tel"
                                                            name="phone"
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            aria-label="default input example"
                                                        />
                                                        {errors.phone && touched.phone ? <h6 className="text-danger">{errors.phone}</h6> : null}
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="exampleInputnumber" className="form-label">
                                                            <b>Upload Resume</b>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="Upload"
                                                            onChange={(event) => {
                                                                setFieldValue("Upload", event.currentTarget.files[0]);
                                                            }}
                                                            onBlur={handleBlur}
                                                            aria-label="default input example"
                                                        />
                                                        {errors.Upload && touched.Upload ? <h6 className="text-danger">{errors.Upload}</h6> : null}
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        <button type="submit" className="btn btn-primary w-100"
                                                            onClick={() => handleApply(SelectJob._id)}
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                </form>
                                                {ApplyMessage !== "" ? <h5 className="text-danger text-center mt-3">{ApplyMessage}</h5> : null}
                                            </div>
                                            <button onClick={() => setPopupVisible(false)}>Close</button>
                                        </div>
                                    )
                                }

                                <hr />

                                <ul className="d-grid gap-4 my-2 list-unstyled">
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-2 "><b>Job details</b></h5>
                                            Salary
                                            <div className="salary-income">
                                                {SelectJob.salary}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-2 "><b>Jobtitle</b></h5>
                                            {SelectJob.jobTitle}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-2 "><b>Location</b></h5>
                                            {SelectJob.location}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-2 "><b>Email</b></h5>
                                            {SelectJob.email}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-2 "><b>Job Discription</b></h5>
                                            {SelectJob.jobDetails}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4 ">
                                        <div>
                                            <h5 className="mb-2 "><b>Job Requirements</b></h5>
                                            {SelectJob.jobRequirements}
                                        </div>
                                    </li>
                                </ul>
                                <ToastContainer />
                            </>
                        </div>
                    </div>
                </div>
            }



        </>
    );
};

export default ApplyJobCard;
