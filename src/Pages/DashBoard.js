import React, { useEffect, useState } from "react";
// import DatePicker from "react-multi-date-picker";
import axios from "axios";
// import { MantineReactTable } from 'mantine-react-table';
// import type { TableInstance, DataType } from 'react-table-ui'
import '../Pages/EmployeeAdmin.css'
import Moment from 'react-moment';
import SideBar from "../Components/SideBar";
import JobSeeker from "./JobSeeker";
import { useNavigate } from "react-router-dom";


const DashBoard = ({ setUser }) => {


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




    return (
        <>


            {/* <header className="navbar navbar-dark bg-dark flex-md-nowrap p-0">
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
                        <button className="btn btn-primary" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </div>
                </div>
            </header> */}
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



            <div className="container data-table">
                {/* <JobSeeker /> */}
                <h3 className="d-flex justify-content-center">Welcome Admin</h3>
                {/* <JobSeeker /> */}
            </div>
        </>
    );
};

export default DashBoard;
