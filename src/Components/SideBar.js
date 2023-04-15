import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './SideBar.css'
const SideBar = () => {





    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, [setActiveLink]);



    return (
        <>
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse"
            >
                <div className="position-relative pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className={`nav-link ${activeLink === '/jobseeker' ? 'active1' : ''}`} style={{ textDecoration: 'none', color: 'black' }} to='/jobseeker'>
                                <span data-feather="file" />
                                Job Seeker
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeLink === '/allemployer' ? 'active1' : ''}`} style={{ textDecoration: 'none', color: 'black' }} to='/allemployer'>
                                <span data-feather="shopping-cart" />
                                Employer
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeLink === '/alljobs' ? 'active1' : ''}`} style={{ textDecoration: 'none', color: 'black' }} to='/alljobs'>
                                <span data-feather="users" />
                                All Jobs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeLink === '/pricing' ? 'active1' : ''}`} style={{ textDecoration: 'none', color: 'black' }} to='/pricing'>
                                <span data-feather="bar-chart-2" />
                                Change Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeLink === '/changeduration' ? 'active1' : ''}`} style={{ textDecoration: 'none', color: 'black' }} to='/changeduration'>
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
