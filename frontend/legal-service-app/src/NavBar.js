/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import History from "./History";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import {refreshAccessToken} from "./Axios"

const NavBar = () => {
    const cookie = new Cookies();
    const [logged_in, setLoggedIn] = useState(cookie.get('logged_in'));
    const [open, setOpen] = useState(true);
    const ref = useRef(null);
    const CloseOnOutsideClick = () => {
        if (window.innerWidth <= 991) setOpen(false);
    };
    useEffect(() => {
        document.addEventListener("mousedown", CloseOnOutsideClick);
        return () =>
            document.removeEventListener("mousedown", CloseOnOutsideClick);
    }, [ref]);
    const Menu = () => {
        if (window.innerWidth >= 991) setOpen(true);
        else setOpen(false)
    };
    useEffect(Menu, []);
    useEffect(() => {
        setLoggedIn(cookie.get('logged_in'));
        window.addEventListener("resize", Menu);
        return () => window.removeEventListener("resize", Menu);
    });

    // Attempt automatic login
    useEffect(() => {
        if (!logged_in) {
            refreshAccessToken()
                .then(() => {
                    window.location.reload();
                }).catch(() => {})
        }
    }, []);

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="navbar-header">
                    <a id="mobile_btn" onClick={() => setOpen(true)} href="#">
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
                <div
                    className="main-menu-wrapper"
                    style={{
                        transform: open
                            ? "translateX(0px)"
                            : "translateX(-260px)",
                    }}
                    ref={ref}
                >
                    <div className="menu-header">
                        <Link className="menu-logo" to="/">
                            <b>Lawbe</b>.co.uk
                        </Link>
                        <a
                            id="menu_close"
                            onClick={() => setOpen(false)}
                            className="menu-close"
                            href="#"
                        >
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
                            <Link
                                to={`${History.location.pathname}/login`}
                                style={{
                                    visibility: logged_in
                                        ? "hidden"
                                        : "visible",
                                }}
                            >
                                Login / Signup
                            </Link>
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
                    <li className="nav-item" style={{display: logged_in ? "none" : ""}}>
                        <Link
                            className="nav-link header-login"
                            to={`${History.location.pathname}/login`}
                        >
                            login / Signup{" "}
                        </Link>
                    </li>
                    {logged_in && (<NotificationDropdown />)}
                    {logged_in && (<UserDropdown />)}
                </ul>
            </nav>
        </header>
    );
};
export default NavBar;
