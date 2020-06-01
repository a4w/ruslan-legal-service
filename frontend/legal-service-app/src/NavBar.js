/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalPopUp from "./Modal";
import LoginForm from "./LoginForm";

const NavBar = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="navbar-header">
                    <a id="mobile_btn" href="#">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <a href="index.html" className="navbar-brand logo">
                        <img
                            src="assets/img/logo.png"
                            className="img-fluid"
                            alt="Logo"
                        />
                    </a>
                </div>
                <div className="main-menu-wrapper">
                    <div className="menu-header">
                        <a href="index.html" className="menu-logo">
                            <img
                                src="assets/img/logo.png"
                                className="img-fluid"
                                alt="Logo"
                            />
                        </a>
                        <a id="menu_close" className="menu-close" href="#">
                            <i className="fas fa-times"></i>
                        </a>
                    </div>
                    <ul className="main-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="has-submenu">
                            <a href="">
                                Doctors <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="lawyer-dashboard.html">
                                        Doctor Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="appointments.html">Appointments</a>
                                </li>
                                <li>
                                    <a href="schedule-timings.html">
                                        Schedule Timing
                                    </a>
                                </li>
                                <li>
                                    <a href="my-patients.html">Patients List</a>
                                </li>
                                <li>
                                    <a href="client-profile.html">
                                        Patients Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="chat-lawyer.html">Chat</a>
                                </li>
                                <li>
                                    <a href="invoices.html">Invoices</a>
                                </li>
                                <li>
                                    <a href="lawyer-profile-settings.html">
                                        Profile Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="reviews.html">Reviews</a>
                                </li>
                                <li>
                                    <a href="lawyer-register.html">
                                        Doctor Register
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu">
                            <a href="">
                                Patients <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="submenu">
                                <li className="has-submenu">
                                    <a href="#">Doctors</a>
                                    <ul className="submenu">
                                        <li>
                                            <a href="map-grid.html">Map Grid</a>
                                        </li>
                                        <li>
                                            <a href="map-list.html">Map List</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="search.html">Search Doctor</a>
                                </li>
                                <li>
                                    <a href="lawyer-profile.html">
                                        Doctor Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="booking.html">Booking</a>
                                </li>
                                <li>
                                    <a href="checkout.html">Checkout</a>
                                </li>
                                <li>
                                    <a href="booking-success.html">
                                        Booking Success
                                    </a>
                                </li>
                                <li>
                                    <a href="client-dashboard.html">
                                        Patient Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="favourites.html">Favourites</a>
                                </li>
                                <li>
                                    <a href="chat.html">Chat</a>
                                </li>
                                <li>
                                    <a href="profile-settings.html">
                                        Profile Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="change-password.html">
                                        Change Password
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu active">
                            <a href="">
                                Pages <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="voice-call.html">Voice Call</a>
                                </li>
                                <li>
                                    <a href="video-call.html">Video Call</a>
                                </li>
                                <li>
                                    <a href="search.html">Search Doctors</a>
                                </li>
                                <li>
                                    <a href="calendar.html">Calendar</a>
                                </li>
                                <li>
                                    <a href="components.html">Components</a>
                                </li>
                                <li className="has-submenu">
                                    <a href="invoices.html">Invoices</a>
                                    <ul className="submenu">
                                        <li>
                                            <a href="invoices.html">Invoices</a>
                                        </li>
                                        <li>
                                            <a href="invoice-view.html">
                                                Invoice View
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="blank-page.html">Starter Page</a>
                                </li>
                                <li>
                                    <a href="login.html">Login</a>
                                </li>
                                <li className="active">
                                    <a href="register.html">Register</a>
                                </li>
                                <li>
                                    <a href="forgot-password.html">
                                        Forgot Password
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu">
                            <a href="">
                                Blog <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="blog-list.html">Blog List</a>
                                </li>
                                <li>
                                    <a href="blog-grid.html">Blog Grid</a>
                                </li>
                                <li>
                                    <a href="blog-details.html">Blog Details</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="admin/index.html" target="_blank">
                                Admin
                            </a>
                        </li>
                        <li className="login-link">
                            <a href="login.html">Login / Signup</a>
                        </li>
                    </ul>
                </div>
                <ul className="nav header-navbar-rht">
                    <li className="nav-item contact-item">
                        <div className="header-contact-img">
                            <i className="far fa-hospital"></i>
                        </div>
                        <div className="header-contact-detail">
                            <p className="contact-header">Contact</p>
                            <p className="contact-info-header">
                                {" "}
                                +1 315 369 5943
                            </p>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link header-login"
                            onClick={() => setModalShow(true)}
                        >
                            login / Signup{" "}
                        </a>
                        <ModalPopUp
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
