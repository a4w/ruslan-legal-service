import React, {useState, useEffect, useRef, useContext} from "react";
import {MdNotificationsActive} from "react-icons/md";
import "./Notification.css";
import moment from "moment";
import {toast} from "react-toastify";
import useInterval from "./useInterval";
import useRequests from "./useRequests"
import {AuthContext} from "./App";
import NoContent from "./NoContent";

const NotificationDropdown = () => {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [newNotification, setNew] = useState(0);

    const {request} = useRequests();

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
    const MarkAllRead = () => {
        request({url: "/account/mark-read-notifications", method: "GET"})
            .then((res) => {
                toast.success("Marked all as read successfuly!");
            })
            .catch((err) => {
                toast.error("An Error Occured");
            });
    }
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
                {newNotification !== 0 && <span className="badge badge-pill">{newNotification}</span>}
            </a>
            <div
                className={`dropdown-menu notifications ${
                    notificationToggle ? "show" : ""
                    }`}
            >
                <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                </div>
                <div className="noti-content" style={{display: ""}}>
                    <Notifications setNew={setNew} />
                </div>
                <div className="topnav-dropdown-footer">
                    <a href="#" className="clear-noti" onClick={MarkAllRead}>
                        Mark all read
                    </a>
                </div>
            </div>
        </li>
    );
};

const Notifications = ({setNew}) => {
    const [notifications, setNotifications] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const {request} = useRequests();
    const [auth,] = useContext(AuthContext);
    const getNotifications = () => {
        if (!auth.isLoggedIn) {
            return;
        }
        if(isFetching)
            return;
        setIsFetching(true);
        request({url: "/account/notifications", method: "GET"})
            .then((data) => {
                setNotifications([...data.notifications]);
                setNew(data.notifications.length);
            })
            .catch((err) => {})
            .finally(() => {
                setIsFetching(false);
            });
    }
    useEffect(getNotifications, []);
    const MarkAsRead = (notification) => {
        request({url: `/account/notification/${notification}`, method: "GET"})
            .then((res) => {
            })
            .catch((err) => {
                toast.error("An Error Occured");
            });
    }
    useInterval(() => {
        getNotifications();
    }, 3000);
    return (
        <ul className="notification-list">
            {notifications && notifications.length ? (
                notifications.map((notification) => (
                    <li className="notification-message" key={notification.id}>
                        <a href="#" onClick={() => MarkAsRead(notification.id)}>
                            <div className="media">
                                <div className="media-body">
                                    <Notification {...notification} />
                                    <p className="noti-time">
                                        <span className="notification-time">
                                            {`at ${moment(
                                                notification.created_at
                                            ).format("MM/D, hh:mm a")}`}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                ))
            ) : (
                <NoContent imageStyle={{width:"50%"}} label=" " >There are no new notifications</NoContent>
            )}
        </ul>
    );
};

const Notification = ({data: {type, notification_data}}) => {
    switch (type) {
        case "INCOMING_MESSAGE":
            return (
                <p
                    className="noti-details"
                >
                    <span className="noti-title">
                        {`${notification_data.sender_name} Sent you a message!`}
                    </span>
                    <br />
                    {notification_data.message_hint}
                </p>
            );

        default:
            return <p> no data </p>;
    }
};

export default NotificationDropdown;
