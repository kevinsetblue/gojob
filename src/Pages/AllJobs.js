import React, { useEffect, useState } from "react";
import '../Pages/EmployeeAdmin.css'
import axios from "axios";
import Moment from 'react-moment';
import SideBar from "../Components/SideBar";
import '../Pages/AllJobs.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'

const AllJobs = ({ setUser }) => {

    const [TableUser, setTableUser] = useState([]);
    const [Loader, setLoader] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);


    function handleSignOut() {
        localStorage.removeItem("admintoken");
        localStorage.removeItem("adminuser");
        setUser(null);
        navigate('/');
    }


    const GetToken = localStorage.getItem("admintoken");

    const getTableData = () => {

        axios.get('https://gojob-x5qp.onrender.com/api/admin/alljobs',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': GetToken
                }
            }
        )
            .then(response => {
                setTableUser(response.data.info);
                setLoader(false);
            })
    }

    const [popupVisible, setPopupVisible] = useState(false);



    const [Jobid, setJobid] = useState(null);
    const [Status, setStaus] = useState(false);
    const [isActive, setIsActive] = useState(null);
    const handleCheckboxClick = (jobId, isActive, isChecked) => {
        setPopupVisible(true);
        setJobid(jobId);
        setIsActive(isActive);
    }

    const notify = (message) => {
        toast.success(message);
    };

    const Opendata = () => {

        const GetToken = localStorage.getItem("admintoken");
        if (Number.isInteger(isActive)) {
        }
        var kk;

        if (isActive === 1) {
            kk = "1to0"
        }
        else {
            kk = "0to1"
        }

        var Data = {
            "jobId": Jobid,
            "action": kk
        }

        setPopupVisible(false);

        axios.post('https://gojob-x5qp.onrender.com/api/admin/jobstatuschange', Data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': GetToken
                }
            }
        )
            .then(response => {
                if (response.data.message) {
                    setStaus(response.data.message)
                    notify(`Status changed to ${response.data.message}`);
                }
            })
    }




    useEffect(() => {
        getTableData();
    }, []);


    return (
        <>

            <header className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="##">
                    <img src="img/Gojob.png" alt="" width={70} height={35} />
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                        <button className="btn btn-light" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <SideBar />


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


            {
                popupVisible && (
                    <div className="popup">
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg
                                className="bi flex-shrink-0 me-2"
                                width={24}
                                height={24}
                                role="img"
                                aria-label="Danger:"
                            >
                                <use xlinkHref="#exclamation-triangle-fill" />
                            </svg>
                            <div>Do you want to change status of this job?</div>
                        </div>
                        <div className="d-flex">
                            <button onClick={() => Opendata()}>Yes</button>
                            <button onClick={() => setPopupVisible(false)}>No</button>
                        </div>
                    </div>
                )
            }


            {
                Status ? <h5 className="text-success text-center">{Status}</h5> : null
            }
            <div className="container data-table">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date </th>
                                <th>Company Name </th>
                                <th className="cursor-pointer">Jobtitle</th>
                                <th className="cursor-pointer">Days</th>
                                <th>Active</th>
                            </tr>
                        </thead>

                        <tbody>


                            {TableUser && TableUser.map((Data, id) => {
                                const jobId = Data.jobId;
                                var nm = Data.isActive;

                                return (
                                    <React.Fragment key={id}>

                                        <tr>
                                            <td>
                                                <Moment format="DD/MM/YYYY">
                                                    {Data.updatedAt}
                                                </Moment>
                                            </td>
                                            <td>
                                                <h6 className="username mt-2">{Data.companyName}</h6>
                                            </td>
                                            <td>
                                                <div className="badge rounded-pill bg-danger">{Data.jobTitle}</div>
                                            </td>
                                            <td>
                                                {Data.daysRemaining}
                                            </td>
                                            <td>
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id={`flexSwitchCheckChecked-${jobId}`}
                                                        defaultChecked={Data.isActive}
                                                        onChange={(e) => handleCheckboxClick(jobId, Data.isActive, e.target.checked)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AllJobs;
