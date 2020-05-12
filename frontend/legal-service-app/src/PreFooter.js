/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {FaTwitter, FaFacebook} from "react-icons/fa"
import "react-icons/fa/index"

const PreFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-about">
                                <div className="footer-logo">
                                    <span className="text-primary"><b>Lawbe</b>.co.uk</span>
                                </div>
                                <div className="footer-about-content">
                                    <p>
                                        <b>Lawbe.co.uk</b> is a service where you can appoint lawyers and have online meetings with them from the comfort of your home
                                    </p>
                                    <div className="social-icon">
                                        <ul>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <FaFacebook />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <FaTwitter />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-menu">
                                <h2 className="footer-title">For Clients</h2>
                                <ul>
                                    <li>
                                        <a href="#">Search for Lawyers</a>
                                    </li>
                                    <li>
                                        <a href="#">Login</a>
                                    </li>
                                    <li>
                                        <a href="#">Register</a>
                                    </li>
                                    <li>
                                        <a href="#">Message lawyers directly</a>
                                    </li>
                                    <li>
                                        <a href="#">Book appointments</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-menu">
                                <h2 className="footer-title">For Lawyers</h2>
                                <ul>
                                    <li>
                                        <a href="#">Manage appointments</a>
                                    </li>
                                    <li>
                                        <a href="#">Chat</a>
                                    </li>
                                    <li>
                                        <a href="#">Login</a>
                                    </li>
                                    <li>
                                        <a href="#">Register</a>
                                    </li>
                                    <li>
                                        <a href="#">Lawyer Dashboard</a>
                                    </li>
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
                                        <p>
                                            {" "}
                                            3556 Beech Street, San Francisco, California, CA 94108{" "}
                                        </p>
                                    </div>
                                    <p>
                                        <i className="fas fa-phone-alt"></i>
                                        +1 315 369 5943
                                    </p>
                                    <p className="mb-0">
                                        <i className="fas fa-envelope"></i>
                                        support@lawbe.co.uk
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
                                            <a href="term-condition.html">Terms and Conditions</a>
                                        </li>
                                        <li>
                                            <a href="privacy-policy.html">Policy</a>
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

export default PreFooter;
