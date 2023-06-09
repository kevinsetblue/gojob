import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = ({ User, setUser, }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);


    function handleSignOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                        <img src="img/Gojob.png" alt="" width={70} height={35} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-black active" aria-current="page" to='/'>
                                    Find Jobs
                                </Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-black" to='/signin'>
                                        <button className="btn btn-primary btn-sm" onClick={handleSignOut}>
                                            <RiAccountCircleLine style={{ fontSize: '20px' }} />
                                            {
                                                User ? <span className="navbar-text text-white ml-2">
                                                    Sign out
                                                </span>
                                                    : "Sign in"
                                            }
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-black mt-1" to='/employerspostjob'>
                                        Employers / Post Job
                                    </Link>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
