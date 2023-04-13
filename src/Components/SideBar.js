import React from "react";
import { Link } from "react-router-dom";
import './SideBar.css'
const SideBar = () => {
    return (
        <>
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse"
            >
                <div className="position-relative pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to='/jobseeker'>
                                <span data-feather="file" />
                                Job Seeker
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/allemployer'>
                                <span data-feather="shopping-cart" />
                                Employer
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/alljobs'>
                                <span data-feather="users" />
                                All Jobs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/pricing'>
                                <span data-feather="bar-chart-2" />
                                Change Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/changeduration'>
                                <span data-feather="layers" />
                                Change Duration
                            </Link>
                        </li>
                    </ul>


                </div>
            </nav>

        </>
    );
};

export default SideBar;
