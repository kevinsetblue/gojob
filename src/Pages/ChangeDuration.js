import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ChangeDuration = ({ setUser }) => {

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


    const [newPrice, setNewPrice] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        setPricevalue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        updatePrice(newPrice);
    };


    const updatePrice = (price) => {
        const url = 'https://gojob-x5qp.onrender.com/api/admin/setdays';
        const authToken = localStorage.getItem('admintoken'); // Get authorization token from localStorage

        const requestBody = {
            days: pricevalue
        };

        axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': authToken
            }
        })
            .then(response => {
                console.log('Duration of Job Days Updated.', response.data.message);
                setSuccess('Duration of Job Days Updated.');
            })
            .catch(error => {
                console.error('Please enter correct jobId!', error);
                setError('Please enter correct jobId!');
            });
    };



    const [pricevalue, setPricevalue] = useState([]);
    const getjob = () => {
        axios.get('https://gojob-x5qp.onrender.com/api/jobdays')
            .then(response => {
                console.log(response.data.days);
                setPricevalue(response.data.days)
            })
    }

    useEffect(() => {
        getjob()
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

            <div className="container job-change mt-4">

                <form className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4" onSubmit={handleFormSubmit}>
                    Duration of Job:
                    <input
                        className="form-control me-2"
                        type="number"
                        placeholder="Search"
                        aria-label="Search"
                        value={pricevalue}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Update
                    </button>
                </form>

                {error && <p className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4 text-danger">Error: {error}</p>}
                {success && <p className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4 text-success">Success: {success}</p>}
            </div>
        </>
    );
};

export default ChangeDuration;
