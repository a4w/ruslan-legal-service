/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {Link} from "react-router-dom";
import ModalPopUp from "./Modal";

const Footer = () => {
    const Register = () => {
        const [modalShow, setModalShow] = useState(false);
        return (
            <>
                <a onClick={() => setModalShow(true)}>Register</a>
                <ModalPopUp
                    register={true}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        );
    };
    const Login = () => {
        const [modalShow, setModalShow] = useState(false);
        return (
            <>
                <a onClick={() => setModalShow(true)}>Login</a>
                <ModalPopUp
                    register={false}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        );
    };
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
                                            <b>Lawbe</b>.co.uk
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
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-menu">
                                <h2 className="footer-title">For Clients</h2>
                                <ul>
                                    <li>
                                        <Link to="/list">
                                            Search for Lawyers
                                        </Link>
                                    </li>
                                    <li>
                                        <Login />
                                    </li>
                                    <li>
                                        <Register />
                                    </li>
                                    <li>
                                        <Link to="/book">Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/client-dashboard">
                                            Client Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget footer-menu">
                                <h2 className="footer-title">For Lawyers</h2>
                                <ul>
                                    <li>
                                        <Link to="/dashboard/appointments">
                                            Appointments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/messages">
                                            Chat
                                        </Link>
                                    </li>
                                    <li>
                                        <Login />
                                    </li>
                                    <li>
                                        <Register />
                                    </li>
                                    <li>
                                        <Link to="/dashboard">
                                            Lawyer Dashboard
                                        </Link>
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
                                        <p>Company location</p>
                                    </div>
                                    <p>
                                        <i className="fas fa-phone-alt"></i>
                                        Contact number
                                    </p>
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
