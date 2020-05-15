/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link} from "react-router-dom";
import {FiPhoneCall} from "react-icons/fi"

const PreNavBar = () => {
    return (
        <header className='header'>
            <nav className='navbar navbar-expand-lg header-nav'>
                <div className='navbar-header'>
                    <a id='mobile_btn' href='#'>
                        <span className='bar-icon'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <Link to='/' className='navbar-brand logo'>
                        <b>Lawbe</b>.co.uk
                    </Link>
                </div>
                <div className='main-menu-wrapper'>
                    <div className='menu-header'>
                        <a href='index.html' className='menu-logo'>
                            <img
                                src='assets/img/logo.png'
                                className='img-fluid'
                                alt='Logo'
                            />
                        </a>
                        <a id='menu_close' className='menu-close' href='#'>
                            <i className='fas fa-times'></i>
                        </a>
                    </div>
                    <ul className='main-nav'>
                        <li>
                            <b>We are coming soon</b>, <Link className="d-inline text-underline" to="/register">register</Link> to be the first notified
                        </li>
                    </ul>
                </div>
                <ul className='nav header-navbar-rht'>
                    <li className='nav-item contact-item'>
                        <div className='header-contact-detail'>
                            <p className='contact-header'>Contact</p>
                            <a href="mailto:info@lawbe.co.uk"><p className='contact-info-header'>info@lawbe.co.uk</p></a>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default PreNavBar;
