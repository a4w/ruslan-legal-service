import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavTab } from "react-router-tabs";

const ClientDashboardSidebar = () => {
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a href="//" className="booking-lawyer-img">
                        {/* <img
                            src="assets/img/patients/patient.jpg"
                            alt="User Image"
                        /> */}
                        Client's PP
                    </a>
                    <div className="profile-det-info">
                        <h3>Client's name</h3>
                        <div className="client-details">
                            <h5>
                                <i className="fas fa-phone"></i> Phone
                            </h5>
                            <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i> City,
                                Country
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
                                <NavTab to="/client-dashboard/messages">
                                    <i className="fas fa-comments"></i>
                                    <span>Messages</span>
                                    <small className="unread-msg">23</small>
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
                                <NavTab to="/client-dashboard/logout">
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </NavTab>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </div>
        </div>
    );
};
export default ClientDashboardSidebar;
