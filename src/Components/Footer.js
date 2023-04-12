import React from "react";
import './Footer.css'
const Footer = () => {
    return (
        <>


            <div className="main-height">
                <div className="content">
                    {/* Your page content goes here */}
                    <footer className="footer mt-auto py-3 bg-dark">
                        <div className="container text-center">
                            <ul className="nav justify-content-center">
                                <span className="text-muted mt-2">&copy; 2023 Gojob</span>
                                <li className="nav-item">
                                    <a href="##" className="nav-link text-muted">
                                        Accessibility atGojob
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="##" className="nav-link text-muted">
                                        Privacy Center
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="##" className="nav-link text-muted">
                                        Cookies
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="##" className="nav-link text-muted">
                                        Privacy
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="##" className="nav-link text-muted">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Footer;
