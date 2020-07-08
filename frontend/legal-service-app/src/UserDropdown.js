import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {LogOut, request} from "./Axios";
import Img from "./Img";
import Cookies from "universal-cookie";

const UserDropdown = () => {
    const cookie = new Cookies();
    const [isClient, setIsClient] = useState(cookie.get('account_type') === "CLIENT");
    const ref = useRef(null);
    const [menuToggle, setMenuToggle] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!cookie.get('logged_in')) {
            return;
        }
        request({url: "/account/personal-info", method: "GET"})
            .then((data) => {
                setUser(data.profile_data);
                setIsClient(cookie.get('account_type') === "CLIENT");
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenuToggle(false);
        }
    };

    const handleButtonClick = () => {
        setMenuToggle(!menuToggle);
    };
    return (
        <li
            className={`nav-item dropdown has-arrow logged-item ${
                menuToggle ? "show" : ""
                }`}
            ref={ref}
        >
            <Link
                to="#"
                className="dropdown-toggle nav-link"
                onClick={handleButtonClick}
            >
                <span className="user-img">
                    <Img
                        className="rounded-circle"
                        src={user.profile_picture}
                        style={{width: "31"}}
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
                        <Img
                            src={user.profile_picture}
                            alt="User Image"
                            className="avatar-img rounded-circle"
                        />
                    </div>
                    <div className="user-text">
                        <h6>{`${user.name} ${user.surname}`}</h6>
                        <p className="text-muted mb-0">{isClient ? "Client" : "Lawyer"}</p>
                    </div>
                </div>
                <Link
                    className="dropdown-item"
                    to={isClient ? "/client-dashboard" : "/dashboard"}
                    onClick={handleButtonClick}
                >
                    Dashboard
                </Link>
                <Link
                    className="dropdown-item"
                    to="/chat"
                    onClick={handleButtonClick}
                >
                    Messages
                </Link>
                <Link
                    className="dropdown-item"
                    to="/calendar"
                    onClick={handleButtonClick}
                >
                    Agenda
                </Link>
                <Link
                    className="dropdown-item"
                    to={`${isClient ? "/client-dashboard" : "/dashboard"}/settings/basic-info`}
                    onClick={handleButtonClick}
                >
                    Profile Settings
                </Link>
                <button
                    className="dropdown-item"
                    onClick={() => {
                        handleButtonClick();
                        LogOut();
                    }}
                >
                    Logout
                </button>
            </div>
        </li>
    );
};

export default UserDropdown;
