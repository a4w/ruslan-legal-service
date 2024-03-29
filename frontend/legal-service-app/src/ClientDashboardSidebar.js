import React, {useState, useEffect, useContext} from "react";
import Nav from "react-bootstrap/Nav";
import {NavTab} from "react-router-tabs";
import Img from "./Img";
import useRequests from "./useRequests";
import {LoadingOverlayContext} from "./App";

const ClientDashboardSidebar = () => {
    const [account, setAccount] = useState({});
    const {request, Logout} = useRequests();
    const loader = useContext(LoadingOverlayContext);
    useEffect(() => {
        loader.setLoadingOverlayText("Loading...");

        loader.setIsLoadingOverlayShown(true);
        request({url: "/account/personal-info", method: "GET"})
            .then((data) => {
                setAccount(data.profile_data);
                loader.setIsLoadingOverlayShown(false);
            })
            .catch((err) => {});
    }, []);
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a className="booking-lawyer-img">
                        <Img src={account.profile_picture} alt="User Image" />
                    </a>
                    <div className="profile-det-info">
                        <h3>{account.name ? `${account.name} ${account.surname}` : "loading..."}</h3>
                        <div className="client-details">
                            <h5>
                                <i className="fas fa-phone"></i> {account.phone}
                            </h5>
                            <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {account.city && account.country
                                    ? `${account.city}, ${account.country}`
                                    : "-"}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                <Nav className="dashboard-menu">
                    <div className="dashboard-menu">
                        <ul>
                            <li>
                                <NavTab to="/client-dashboard/status">
                                    <i className="fas fa-columns"></i>
                                    <span> Dashboard</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/client-dashboard/calendar">
                                    <i className="fas fa-calendar"></i>
                                    <span>Calendar</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab replace={false} to="/client-dashboard/chat">
                                    <i className="fas fa-comments"></i>
                                    <span>Messages</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab to="/client-dashboard/settings">
                                    <i className="fas fa-user-cog"></i>
                                    <span>Profile Settings</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab to="/client-dashboard/change-password">
                                    <i className="fas fa-lock"></i>
                                    <span>Change Password</span>
                                </NavTab>
                            </li>
                            <li>
                                <a href="#" onClick={Logout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </div>
        </div>
    );
};
export default ClientDashboardSidebar;
