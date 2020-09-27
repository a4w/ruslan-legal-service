/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef, useContext} from "react";
import {Link} from "react-router-dom";
import History from "./History";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import {AuthContext} from "./App";
import useRequests from "./useRequests";
import StickyBox from "react-sticky-box";

const NavBar = () => {
    const [auth,] = useContext(AuthContext);
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
        window.addEventListener("resize", Menu);
        return () => window.removeEventListener("resize", Menu);
    });
    const {refreshAccessToken, fetchNewAccessToken} = useRequests();
    // Attempt automatic login
    useEffect(() => {
        if (!auth.isLoggedIn) {
            refreshAccessToken().then(() => {
            }).catch(() => {
                console.log("Fetching new access token");
                fetchNewAccessToken()
                    .catch(() => {})
            })
        }
    }, [auth]);

    return (
        <StickyBox style={{zIndex: 10}}>
            <header>
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
                            <img src="/logo-ru12.png" style={{maxWidth: '100%', maxHeight: '50px'}} />
                            <span><b>Lawbe</b><small style={{fontWeight: '100', fontSize: '0.7em'}}>.co.uk</small></span>
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
                            <li onClick={CloseOnOutsideClick}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={CloseOnOutsideClick}>
                                <Link to="/list">Lawyers</Link>
                            </li >
                            <li onClick={CloseOnOutsideClick}>
                                <Link to="/blogs">Blogs</Link>
                            </li>
                            <li className="login-link">
                                <Link
                                    onClick={CloseOnOutsideClick}
                                    to={`${History.location.pathname}/login`}
                                    style={{
                                        visibility: auth.isLoggedIn
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
                        <li className="nav-item singup" style={{display: auth.isLoggedIn ? "none" : ""}}>
                            <Link
                                className="nav-link header-login"
                                to={`${History.location.pathname}/login`}
                            >
                                login / Signup{" "}
                            </Link>
                        </li>
                        {auth.isLoggedIn && (<NotificationDropdown />)}
                        {auth.isLoggedIn && (<UserDropdown />)}
                    </ul>
                </nav>
            </header>
        </StickyBox>
    );
};
export default NavBar;
