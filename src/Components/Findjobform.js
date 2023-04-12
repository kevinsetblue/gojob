import React, { useEffect, useState, useRef } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import { CiLocationOn } from "react-icons/ci";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
// import jobdata from './GoJobData.json';
import './FindJobForm.css'
import JobFeedTab from "./JobFeedTab";
// import RecentJobTab from "./RecentJobTab";


const Findjobform = () => {


    const [JobTitle, setJobTitle] = useState("");
    const [Company, setCompany] = useState("");
    const [SearchData, setSearchData] = useState([]);
    const [showBorder, setShowBorder] = useState(false);
    const [Loader, setLoader] = useState(true);
    const [NoData, setNoData] = useState("");



    const [titles, setTitles] = useState([]);
    const [companies, setCompanies] = useState([]);





    var aa = 0;

    const inputRef = useRef(null);


    const getJobData = async () => {
        try {
            const title = JobTitle;
            const companyname = Company;
            let JOB_API;
            inputRef.current.focus();
            setLoader(true);
            setNoData("");
            if (title !== "" && companyname !== "") {
                JOB_API = `https://gojob-x5qp.onrender.com/api/jobsearch?title=${title}&companyname=${companyname}`;
            }
            else if (title !== "" && companyname === "") {
                JOB_API = `https://gojob-x5qp.onrender.com/api/jobsearch?title=${title}`;
            }
            else if (title === "" && companyname !== "") {
                JOB_API = `https://gojob-x5qp.onrender.com/api/jobsearch?companyname=${companyname}`;
            }
            else {
                if (aa !== 0) {
                    setShowBorder(true);
                    inputRef.current.style.border = '1px solid red';
                }
                else {
                    JOB_API = `https://gojob-x5qp.onrender.com/api/jobsearch?title=${title}&companyname=${companyname}`;
                }
            }

            const Response = await fetch(JOB_API);

            if (Response.status === 404 || Response.status === 500) {
                setNoData("No Job Found");
                setLoader(false);
            }
            else {
                const data = await Response.json();
                setSearchData(data.jobPostings);
                setShowBorder(false);
                setLoader(false);
            }
        }
        catch (error) {
            console.log("Error is" + error);
        }
    }





    useEffect(() => {
        getJobData()
    }, []);


    useEffect(() => {
        async function fetchTitlesAndCompanies() {
            try {
                const response = await fetch('https://gojob-x5qp.onrender.com/api/jobfields');
                const data = await response.json();
                setTitles(data.titles);
                setCompanies(data.companies);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTitlesAndCompanies();
    }, []);


    return (
        <>

            {
                Loader ? <>
                    <div className="container-fluid background-banner bg-primary">
                        <div className="container Search-form">
                            <div className="row">
                                <div className="col-md-2"></div>

                                <div className="col-md-8">

                                    <div className="top-heading text-center mt-3">
                                        <h2 className="text-white"><b>The #1 <span style={{ 'color': '#6ced39' }}>Job Board for</span> <br /> Hiring or Find Your Next Tob</b></h2>
                                    </div>



                                    <div className="full-coverd">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-1"><b>What</b></span>
                                                    <input
                                                        ref={inputRef}
                                                        type="text"
                                                        aria-label="First name"
                                                        className="form-control"
                                                        placeholder="job title,keywords"
                                                        value={JobTitle}
                                                        onChange={(e) => setJobTitle(e.target.value)}
                                                        style={showBorder ? { border: '1px solid red' } : {}}
                                                        list="jobTitles"
                                                    />
                                                    <datalist id="jobTitles">
                                                        {titles.map(title => (
                                                            <option key={title} value={title} >{title} </option>
                                                        ))}
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-1"><b>Industry</b></span>
                                                    <input
                                                        ref={inputRef}
                                                        type="text"
                                                        aria-label="Last name"
                                                        className="form-control"
                                                        placeholder="Company"
                                                        value={Company}
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        style={showBorder ? { border: '1px solid red' } : {}}
                                                        list="jobCompanies"
                                                    />
                                                    <datalist id="jobCompanies">
                                                        {companies.map(company => (
                                                            <option key={company} value={company}>{company}</option>
                                                        ))}
                                                    </datalist>
                                                    <button
                                                        className="btn btn-primary rounded-pill"
                                                        type="button"
                                                        onClick={getJobData}
                                                    >
                                                        <BiSearch /> Find jobs
                                                    </button>
                                                </div>
                                            </div>
                                            {showBorder ? <p className="text-danger text-center">Please enter job title or company name</p> : null}
                                        </div>
                                    </div>

                                    {/* <div className="container content-text text-center mt-4">
                                <h6 className="text-white"><Link className="text-white" to='/signin'>Post your resume </Link> – It only takes a few seconds</h6>
                            </div>
                            <div className="container content-another-text text-center">
                                <h6 className="text-white"><Link className="text-white" to='/signin'>Employers: Post a job</Link> – Your next hire is here</h6>
                            </div> */}
                                </div>

                                <div className="col-md-2"></div>
                            </div>
                        </div>
                    </div>


                    <div className="job-search-tabs mt-2">
                        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <h3>Job feed</h3>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link rounded-pill"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                >
                                    Recent Search
                                </button>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                {/* <JobFeedTab SearchData={SearchData} /> */}
                                <div className="mainloader text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                            </div>
                            {/* <div
                                className="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <RecentJobTab />
                            </div> */}
                        </div>
                    </div>



                    {/* <div className="dropdown-button text-center">
                <button type="button" className="btn btn-light" onClick={OpenDropDown}>
                    What's trending on Indeed
                    {
                        DropDownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                    }
                </button>
                {
                    DropDownOpen && <DropDownData cities={cities.cities} />
                }
            </div> */}
                </> : <><div className="container-fluid background-banner bg-primary">
                    <div className="container Search-form">
                        <div className="row">
                            <div className="col-md-2"></div>

                            <div className="col-md-8">

                                <div className="top-heading text-center mt-3">
                                    <h2 className="text-white"><b>The #1 <span style={{ 'color': '#6ced39' }}>Job Board for</span> <br /> Hiring or Find Your Next Tob</b></h2>
                                </div>



                                <div className="full-coverd">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-1"><b>What</b></span>
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    aria-label="First name"
                                                    className="form-control"
                                                    placeholder="job title,keywords"
                                                    value={JobTitle}
                                                    onChange={(e) => setJobTitle(e.target.value)}
                                                    style={showBorder ? { border: '1px solid red' } : {}}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-1"><b>Industry</b></span>
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    aria-label="Last name"
                                                    className="form-control"
                                                    placeholder="Company"
                                                    value={Company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    style={showBorder ? { border: '1px solid red' } : {}}
                                                />
                                                <button
                                                    className="btn btn-primary rounded-pill"
                                                    type="button"
                                                    onClick={getJobData}
                                                >
                                                    <BiSearch /> Find jobs
                                                </button>
                                            </div>
                                        </div>
                                        {showBorder ? <p className="text-danger text-center">Please enter job title or company name</p> : null}
                                    </div>
                                </div>

                                {/* <div className="container content-text text-center mt-4">
                                <h6 className="text-white"><Link className="text-white" to='/signin'>Post your resume </Link> – It only takes a few seconds</h6>
                            </div>
                            <div className="container content-another-text text-center">
                                <h6 className="text-white"><Link className="text-white" to='/signin'>Employers: Post a job</Link> – Your next hire is here</h6>
                            </div> */}
                            </div>

                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>


                    <div className="job-search-tabs mt-2">
                        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <h3>Job feed</h3>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link rounded-pill"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                >
                                    Recent Search
                                </button>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <JobFeedTab SearchData={SearchData} NoData={NoData} />
                            </div>
                            {/* <div
                                className="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <RecentJobTab />
                            </div> */}
                        </div>
                    </div>



                    {/* <div className="dropdown-button text-center">
                <button type="button" className="btn btn-light" onClick={OpenDropDown}>
                    What's trending on Indeed
                    {
                        DropDownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                    }
                </button>
                {
                    DropDownOpen && <DropDownData cities={cities.cities} />
                }
            </div> */}</>
            }



        </>
    );
};

export default Findjobform;
