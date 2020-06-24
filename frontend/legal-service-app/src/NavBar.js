/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalPopUp from "./Modal";

const NavBar = () => {
    const [modalShow, setModalShow] = useState(false);
    const [open, setOpen] = useState(false)
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="navbar-header">
                    <a id="mobile_btn" onClick={()=> setOpen(true)} href="#">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <Link className="navbar-brand logo" to="/">
                        <b>Lawbe</b>.co.uk
                    </Link>
                </div>
                <div className="main-menu-wrapper" style={{transform: open? "translateX(0px)":"translateX(-260px)"}}>
                    <div className="menu-header">
                        <Link className="menu-logo" to="/">
                            <b>Lawbe</b>.co.uk
                        </Link>
                        <a id="menu_close" onClick={()=> setOpen(false)} className="menu-close" href="#">
                            <i className="fas fa-times"></i>
                        </a>
                    </div>
                    <ul className="main-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="has-submenu">
                            <Link to="/list">Lawyers</Link>
                        </li>
                        <li className="has-submenu">
                            <Link to="/blogs">Blogs</Link>
                        </li>
                        <li className="login-link">
                            <a href="login.html">Login / Signup</a>
                        </li>
                    </ul>
                </div>
                <ul className="nav header-navbar-rht">
                    <li className="nav-item contact-item">
                        <div className="header-contact-img">
                            <i className="far fa-building-o"></i>
                        </div>
                        <div className="header-contact-detail">
                            <p className="contact-header">Contact</p>
                            <p className="contact-info-header">
                                {" "}
                                Contact number
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
                            register={true}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
