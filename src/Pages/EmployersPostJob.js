import React, { useState, useEffect } from "react";
import '../Pages/EmployersPostJob.css'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const EmployersPostJob = () => {
    const [Text, setText] = useState("");
    const [Email, setEmail] = useState("");
    const [Jobtitle, setJobtitle] = useState("");
    const [Salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [Requirement, setRequirement] = useState("");
    const [paid, setPaid] = useState(false);
    const [all, setAll] = useState("sef");
    const [formData, setFormData] = useState(null);

    const [store, setStore] = useState({
        orderId: "",
        payerId: "",
        paymentId: "",
        status: "",
        amount: "",
        companyName: "",
        email: "",
        jobTitle: "",
        salary: "",
        location: "",
        jobDetails: "",
        jobRequirements: ""
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        setFormData(formData);
    };


    const handleCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: pricevalue,
                    },
                },
            ],
        });
    };




    const handleApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setPaid(true);
            const formFields = {};
            formData.forEach((value, key) => formFields[key] = value);
            const payload = {
                formFields,
                orderId: data.orderID,
                payerId: data.payerID,
                paymentId: details.purchase_units[0].payments.captures[0].id,
                status: details.purchase_units[0].payments.captures.status,
                amount: details.purchase_units[0].amount.value
            };
            const GetToken = localStorage.getItem("token");
            axios.post("https://gojob-x5qp.onrender.com/api/employer/jobpost", payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': GetToken
                    }
                }
            )
                .then((response) => {
                    navigate('/employerspostjob');
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };



    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const NEWApply = () => {
        const RemoveToken = localStorage.getItem("Employertoken");
        togglePopup();
        if (!RemoveToken) {
            navigate('/employersignin');
        }
    }

    const [pricevalue, setPricevalue] = useState([]);
    const getprice = async () => {
        try {
            await axios.get('https://gojob-x5qp.onrender.com/api/jobprice')
                .then(response => {
                    setPricevalue(response.data.price);
                })
        }
        catch (error) {
            console.log('Error :' + error);
        }
    }

    useEffect(() => {
        getprice()
    }, []);



    const [pricedaysvalue, setPricedaysvalue] = useState([]);
    const getjob = async () => {
        try {
            await axios.get('https://gojob-x5qp.onrender.com/api/jobdays')
                .then(response => {
                    setPricedaysvalue(response.data.days);
                })
        }
        catch (error) {
            console.log('Error :' + error);
        }
    }

    useEffect(() => {
        getjob()
    }, []);


    return (
        <>
            <div className="container-fluid back-banner bg-primary w-100">
                <div className="container banner-text text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="maintext text-white text-start" style={{ marginTop: '5rem' }}>
                                <h1><b>Lets make your next <br /> great hire. Fast</b></h1>

                                <button
                                    type="button"
                                    className="btn btn-light mt-3"
                                    onClick={NEWApply}
                                >
                                    Post Job
                                </button>
                                {
                                    showPopup && (
                                        <div className="popup">
                                            <div className="blue-pop">
                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Company Name
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={Text}
                                                            name="companyName"
                                                            aria-label="default input example"
                                                            onChange={(e) => setText(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Email
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            name="email"
                                                            value={Email}
                                                            aria-label="default input example"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Job Title
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="jobTitle"
                                                            value={Jobtitle}
                                                            aria-label="default input example"
                                                            onChange={(e) => setJobtitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Salary
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="salary"
                                                            value={Salary}
                                                            aria-label="default input example"
                                                            onChange={(e) => setSalary(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Location
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="location"
                                                            value={location}
                                                            aria-label="default input example"
                                                            onChange={(e) => setLocation(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Job Details
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            name="jobDetails"
                                                            value={jobDetails}
                                                            id="floatingTextarea2"
                                                            style={{ height: 100 }}
                                                            onChange={(e) => setJobDetails(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="company-name mt-3">
                                                        <label htmlFor="" className="text-start text-black d-flex">
                                                            Job Requirement
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            name="jobRequirements"
                                                            value={Requirement}
                                                            id="floatingTextarea2"
                                                            style={{ height: 100 }}
                                                            onChange={(e) => setRequirement(e.target.value)}
                                                        />
                                                    </div>


                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary mt-3">
                                                            Post Job
                                                            {
                                                                formData && (
                                                                    <PayPalScriptProvider
                                                                        options={{
                                                                            "client-id": 'AV6CU2FCgknr9rKxkNKHn_4YZGPlgYxf6T0WN4gFdPGy4qfsH9tc7sm1O6BaHFB7kT_rhC9XPOLa5GyF',
                                                                            currency: "USD",
                                                                        }}
                                                                    >
                                                                        <PayPalButtons
                                                                            createOrder={(data, actions) => handleCreateOrder(data, actions)}
                                                                            onApprove={(data, actions) => handleApprove(data, actions)}
                                                                        />
                                                                        {paid && <p>Payment successful!</p>}
                                                                    </PayPalScriptProvider>
                                                                )
                                                            }
                                                        </button>
                                                    </div>
                                                </form>
                                                <button onClick={togglePopup}>Close</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {/* Modal */}
                        </div>

                        <div className="col-md-6">
                            <div className="image">
                                <img src="img/elearning 1.png" alt="" width={300} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="alert alert-dark bg-black rounded-0" role="alert">
                <div className="text-center text-white">
                    The job poster will pay {pricevalue}$ to post a job for {pricedaysvalue} days.
                </div>
            </div>


            <div className="container main-box mt-5">
                <div className="row">
                    <div className="col-md-4">

                        <div className="p-3 mb-4 bg-light rounded-3">
                            <div className="container-fluid">
                                <h5 className="display-5 fw-bold text-primary">01</h5>
                                <h6 className="parag mt-3">
                                    <b>Create Your Free Account</b>
                                </h6>
                                <p>All you need is your email address to create an account and start building your job post.</p>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="p-3 mb-4 bg-light rounded-3">
                            <div className="container-fluid">
                                <h5 className="display-5 fw-bold text-primary">02</h5>
                                <h6 className="parag mt-3">
                                    <b>Build Your Job Post</b>
                                </h6>
                                <p>Then just add a title, description, and location to your job post, and you're ready to go.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-3 mb-4 bg-light rounded-3">
                            <div className="container-fluid">
                                <h5 className="display-5 fw-bold text-primary">03</h5>
                                <h6 className="parag mt-3">
                                    <b>Post Your Job</b>
                                </h6>
                                <p>After you post your job use our state of the art tools to help you find dream talent.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default EmployersPostJob;
