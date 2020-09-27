/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import History from "./History";
import useRequests from "./useRequests";

const Footer = () => {
    const [practiceAreas, setPracticeAreas] = useState([]);
    const {request} = useRequests();
    useEffect(() => {
        request({
            url: 'lawyer/practice-areas',
            method: 'GET'
        }).then(response => {
            setPracticeAreas(response.areas);
        });
    }, []);
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-about">
                                <div className="footer-about-content">
                                    <div className="footer-logo">
                                        <p className="menu-logo" to="/">
                                            <Link className="navbar-brand logo" to="/">
                                                <img src="/logo-ru12.png" style={{maxWidth: '100%', maxHeight: '50px'}} />
                                                <span style={{color: 'white'}}><b>Lawbe</b><small style={{fontWeight: '100', fontSize: '0.7em'}}>.co.uk</small></span>
                                            </Link>
                                        </p>
                                    </div>
                                    <p>Describtion</p>
                                    <div className="social-icon">
                                        <ul>
                                            <li>
                                                <Link to="#" target="_blank">
                                                    <i className="fab fa-facebook-f"></i>{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" target="_blank">
                                                    <i className="fab fa-twitter"></i>{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" target="_blank">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" target="_blank">
                                                    <i className="fab fa-instagram"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" target="_blank">
                                                    <i className="fab fa-dribbble"></i>{" "}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="footer-widget footer-menu">
                                <h2 className="footer-title">Practice Areas</h2>
                                <ul>
                                    {practiceAreas.map((area, i) => (
                                        <li key={i} style={{width: '50%', minWidth: '220px'}}>
                                            <Link
                                                to={{
                                                    pathname: "/list",
                                                    search: `?practice_areas=${area.id}`,
                                                }}
                                            >
                                                {area.area}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-contact">
                                <h2 className="footer-title">Contact Us</h2>
                                <div className="footer-contact-info">
                                    <div className="footer-address">
                                        <span>
                                            <i className="fas fa-map-marker-alt"></i>
                                        </span>
                                        <p>Company location</p>
                                    </div>
                                    <p className="mb-0">
                                        <i className="fas fa-envelope"></i>
                                        contact email
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container-fluid">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <div className="copyright-text">
                                    <p className="mb-0">
                                        &copy; 2020 Lawbe. All rights reserved.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <div className="copyright-menu">
                                    <ul className="policy-menu">
                                        <li>
                                            <Link to="term-condition.html">
                                                Terms and Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="privacy-policy.html">
                                                Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
