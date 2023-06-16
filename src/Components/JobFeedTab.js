import React, { useState } from "react";
import ApplyJobCard from "./ApplyJobCard";
import './JobFeedTab.css';

const JobFeedTab = ({ SearchData, NoData }) => {

    const [NewCard, setNewCard] = useState(true);

    const Opencard = () => {
        setNewCard(true);
    }

    const [SelectJob, setSelectJob] = useState(SearchData[0]);
    const SelectCard = (data12) => {
        const JobCard = data12;
        setSelectJob(JobCard);
    }





    return (
        <>
            <div className="container jobs-card mt-1">
                <div className="row">
                    <div className="col-md-6">
                        {
                            NoData ? <h5 className="text-danger text-center">{NoData}</h5> : SearchData.map((data, id) => {
                                return (
                                    <React.Fragment key={id} >
                                        <div className="jobsearch-ResultsList" >
                                            <li>
                                                <div className="card mt-4" onClick={() => SelectCard(data)}>

                                                    {id === 0 ? () => SelectCard(data) : null}

                                                    <table
                                                        className="jobCard_mainContent big6_visualChanges"
                                                        cellPadding={0}
                                                        cellSpacing={0}
                                                        role="presentation"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td className="resultContent">
                                                                    <div className="css-1m4cuuf e37uo190">
                                                                        <h2
                                                                            className="jobTitle css-1h4a4n5 eu4oa1w0"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span
                                                                                className="heading-text"
                                                                                title="Manager - IT"
                                                                            >
                                                                                {data.jobTitle}
                                                                            </span>
                                                                        </h2>
                                                                    </div>
                                                                    <div className="heading6 company_location tapItem-gutter companyInfo">
                                                                        <span className="companyName text-secondary">
                                                                            {data.companyName}
                                                                        </span>
                                                                        <div className="companyLocation text-secondary">
                                                                            {data.location}
                                                                        </div>
                                                                    </div>
                                                                    <div className="heading6 tapItem-gutter metadataContainer noJEMChips salaryOnly">
                                                                        <div
                                                                            className="attribute_snippet"
                                                                            data-testid="attribute_snippet_testid"
                                                                        >
                                                                            <span className="badge bg-primary rounded-pill">{data.salary}</span>
                                                                        </div>
                                                                        <div className="metadata">
                                                                            <div
                                                                                className="attribute_snippet text-secondary"
                                                                                data-testid="attribute_snippet_testid"
                                                                            >
                                                                                {data.SearchData}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="heading6 error-text tapItem-gutter" />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table
                                                        className="jobCardShelfContainer big6_visualChanges"
                                                        role="presentation"
                                                    >
                                                        <tbody>
                                                            <tr className="jobCardShelf">
                                                                <td className="shelfItem hiringMultipleCandidates">
                                                                    <div className="hiringMultipleCandidatesCaption mt-3">
                                                                        <span className="hiringMultipleCandidatesIcon text-secondary" />
                                                                        {data.jobDetails}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </li>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>

                    <div className="col-md-6">
                        {
                            NoData ? null
                                : <ApplyJobCard
                                    SearchData={SearchData}
                                    Opencard={Opencard}
                                    SelectJob={SelectJob}
                                    SelectCard={SelectCard}
                                />
                        }
                    </div>

                </div>
            </div>

        </>
    );
};

export default JobFeedTab;
