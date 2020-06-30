/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import History from "./History";
import {LogOut} from "./Axios";
import { MdNotificationsActive } from 'react-icons/md';
import "./Notification.css";

const NavBar = () => {
    const cookie = new Cookies();
    const [logged_in, setLoggedIn] = useState(cookie.get('logged_in'));
    const [menuToggle, setMenuToggle] = useState(false);
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        profile_picture_url: "/test.jpg",
        type: "",
    });
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
                    <li className="nav-item">
                        <Link
                            className="nav-link header-login"
                            style={{
                                display: logged_in ? "none" : "",
                            }}
                            to={`${History.location.pathname}/login`}
                        >
                            login / Signup{" "}
                        </Link>
                    </li>
                    {logged_in && (
                        <li
                            className={`nav-item dropdown noti-dropdown ${
                                notificationToggle ? "show" : ""
                            }`}
                        >
                            <a
                                href="#"
                                className="dropdown-toggle nav-link"
                                onClick={() =>
                                    setNotificationToggle(!notificationToggle)
                                }
                                style={{
                                    fontSize: "1.9rem",
                                    lineHeight: "56px",
                                }}
                            >
                                <MdNotificationsActive />{" "}
                                {/* <i class="fa fa-bell"></i> */}
                                <span className="badge badge-pill">3</span>
                            </a>
                            <div
                                className={`dropdown-menu notifications ${
                                    notificationToggle ? "show" : ""
                                }`}
                                style={{ position: "absolute", left: "-296px" }}
                            >
                                <div className="topnav-dropdown-header">
                                    <span className="notification-title">
                                        Notifications
                                    </span>
                                    <a
                                        href="javascript:void(0)"
                                        className="clear-noti"
                                    >
                                        {" "}
                                        Clear All{" "}
                                    </a>
                                </div>

                                <div
                                    className="noti-content"
                                    style={{ display: "" }}
                                >
                                    <Notifications />
                                </div>
                                <div className="topnav-dropdown-footer">
                                    <a href="#">View all Notifications</a>
                                </div>
                            </div>
                        </li>
                    )}
                    <li
                        className={`nav-item dropdown has-arrow logged-item ${
                            menuToggle ? "show" : ""
                        }`}
                        style={{ display: logged_in ? "" : "none" }}
                    >
                        <Link
                            to="#"
                            className="dropdown-toggle nav-link"
                            onClick={() => setMenuToggle(!menuToggle)}
                        >
                            <span className="user-img">
                                <img
                                    className="rounded-circle"
                                    src={user.profile_picture_url}
                                    width="31"
                                    alt={user.name}
                                />
                            </span>
                        </Link>
                        <div
                            className={`dropdown-menu dropdown-menu-right ${
                                menuToggle ? "show" : ""
                            }`}
                        >
                            <div className="user-header">
                                <div className="avatar avatar-sm">
                                    <img
                                        src={user.profile_picture_url}
                                        alt="User Image"
                                        className="avatar-img rounded-circle"
                                    />
                                </div>
                                <div className="user-text">
                                    <h6>{`${user.name} ${user.surname}`}</h6>
                                    <p className="text-muted mb-0">
                                        {user.type}
                                    </p>
                                </div>
                            </div>
                            <Link className="dropdown-item" to="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="dropdown-item" to="/chat">
                                Messages
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="/dashboard/settings/lawyer-info"
                            >
                                Profile Settings
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="/logout"
                                onClick={LogOut}
                            >
                                Logout
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
const Notifications = ()=>{
    const notifications = [
        {
            id: 1,
            details: "datailssss",
            time: new Date(),
        },
        {
            id: 2,
            details: "hiiii",
            time: new Date(),
        },
        {
            id: 3,
            details: "wtf",
            time: new Date(),
        },
        {
            id: 4,
            details: "Ola",
            time: new Date(),
        },
        {
            id: 5,
            details: "sdfghjkl",
            time: new Date(),
        },
        {
            id: 6,
            details: "hi",
            time: new Date(),
        },
        {
            id: 7,
            details: "how are u",
            time: new Date(),
        },
        {
            id: 8,
            details: "luv u",
            time: new Date(),
        },
    ];
    return (
        <ul className="notification-list">
            {notifications.map((notification, i) => (
                <li className="notification-message" key={i}>
                    <a href="#">
                        <div className="media">
                            <div className="media-body">
                                <p className="noti-details">
                                    {" "}
                                    {notification.details}{" "}
                                </p>
                                <p className="noti-time">
                                    <span className="notification-time">
                                        {notification.time.getTime()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
}
export default NavBar;
