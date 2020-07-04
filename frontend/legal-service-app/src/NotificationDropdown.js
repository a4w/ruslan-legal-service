import React, {useState, useEffect, useRef} from "react";
import {MdNotificationsActive} from "react-icons/md";
import "./Notification.css";
import {request} from "./Axios";

const NotificationDropdown = () => {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setNotificationToggle(false);
        }
    };

    const handleButtonClick = () => {
        setNotificationToggle(!notificationToggle);
    };
    return (
        <li
            className={`nav-item dropdown noti-dropdown ${
                notificationToggle ? "show" : ""
            }`}
            ref={ref}
        >
            <a
                href="#"
                className="dropdown-toggle nav-link"
                onClick={handleButtonClick}
                style={{
                    fontSize: "1.9rem",
                    lineHeight: "56px",
                }}
            >
                <MdNotificationsActive /> {/* <i class="fa fa-bell"></i> */}
                <span className="badge badge-pill">3</span>
            </a>
            <div
                className={`dropdown-menu notifications ${
                    notificationToggle ? "show" : ""
                }`}
                style={{ position: "absolute", left: "-296px" }}
            >
                <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                    <a href="javascript:void(0)" className="clear-noti">
                        {" "}
                        Clear All{" "}
                    </a>
                </div>
                <div className="noti-content" style={{ display: "" }}>
                    <Notifications />
                </div>
                <div className="topnav-dropdown-footer"></div>
            </div>
        </li>
    );
};

const Notifications = () => {
    const [notifications, setNotifications] = useState();
    const getNotifications = ()=>{
        request({ url: "/account/notifications", method: "GET" })
            .then((data) => {
                console.log("-->",data);
                setNotifications(data.notifications);
            })
            .catch((err) => {});
    }
    useEffect(getNotifications, []);
    return (
        <ul className="notification-list">
            {notifications && notifications.map((notification, i) => (
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
};
export default NotificationDropdown;
