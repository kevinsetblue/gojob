import React, { useEffect, useState } from "react";
import '../Pages/EmployeeAdmin.css'
import axios from "axios";
import Moment from 'react-moment';
import SideBar from "../Components/SideBar";



const JobSeeker = () => {








    const [TableUser, setTableUser] = useState([]);

    const GetToken = localStorage.getItem("admintoken");
    // const GetToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmZmFjNmFkZDM5NjdhMzYxMDg4NDkiLCJpYXQiOjE2ODA5MjYwOTYsImV4cCI6MTY4MDkyOTY5Nn0.1U_o9KDtL3VIsIBk_ASjGdJmvZXo7xeswQJ2ksX60ho"

    const getTableData = () => {

        axios.get('https://gojob-x5qp.onrender.com/api/admin/alljobseeker',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': GetToken
                }
            }
        )
            .then(response => {
                // console.log(response.data.info);
                setTableUser(response.data.info);
            })
    }




    useEffect(() => {
        getTableData();
    }, []);


    return (
        <>
            {/* 
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
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
                        <button className="btn btn-primary">
                            Sign out
                        </button>
                    </div>
                </div>
            </header> */}


            <SideBar />

            <div className="container data-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th className="cursor-pointer">Register Method</th>
                            <th className="cursor-pointer">Date</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            TableUser && TableUser.map((Data, id) => {
                                return (
                                    <React.Fragment key={id}>
                                        <tr>
                                            <td>
                                                {Data.name}

                                            </td>
                                            <td>

                                                <div className="badge rounded-pill bg-danger">{Data.registerType}</div>

                                            </td>
                                            <td>

                                                <Moment format="DD/MM/YYYY">
                                                    {Data.createdAt}
                                                </Moment>
                                            </td>
                                            <td>{<h6 className="username mt-2">{Data.email}</h6>}</td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default JobSeeker;
