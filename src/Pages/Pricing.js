import React, { useEffect, useState } from "react";
import '../Pages/EmployeeAdmin.css'
import axios from "axios";
import SideBar from "../Components/SideBar";
import '../Pages/AllJobs.css'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Pricing = ({ setUser }) => {


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
        // if (!newPrice) {
        //     setError('Please enter a valid price!');
        //     return;
        // }
        updatePrice(newPrice);
    };

    const updatePrice = (price) => {
        const url = 'https://gojob-x5qp.onrender.com/api/admin/setpricing';
        const authToken = localStorage.getItem('admintoken'); // Get authorization token from localStorage

        const requestBody = {
            price: pricevalue
        };

        axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': authToken
            }
        })
            .then(response => {
                console.log('Price updated successfully:', response.data);
                setSuccess('Price updated successfully');
            })
            .catch(error => {
                console.error('Error updating price:', error);
                setError('Failed to update price. Please try again.');
            });
    };





    const [pricevalue, setPricevalue] = useState([]);
    const getprice = () => {
        // const GetToken = localStorage.getItem("admintoken");
        axios.get('https://gojob-x5qp.onrender.com/api/jobprice')
            .then(response => {
                console.log(response.data.price);
                setPricevalue(response.data.price)
            })
    }

    useEffect(() => {
        getprice()
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





            <div className="container mt-4">
                {/* <form className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4" onSubmit={handleFormSubmit}>
                    <input
                        className="form-control me-2"
                        type="number"
                        placeholder="enter price"
                        aria-label="Search"
                        value={pricevalue}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Update Price
                    </button>
                </form> */}
                <form className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4" onSubmit={handleFormSubmit}>
                    <label>
                        Change Pricing:
                    </label>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="enter price"
                        aria-label="Search"
                        value={pricevalue}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Update Price
                    </button>
                </form>

                {success && <p className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4 text-success">{success}</p>}
                {error && <p className="d-flex col-md-9 ms-sm-auto col-lg-10 px-md-4 text-danger">{error}</p>}
            </div>







        </>
    );
};

export default Pricing;
