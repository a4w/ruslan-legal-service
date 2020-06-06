import React from "react";
import Nav from "react-bootstrap/Nav";

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
                                <Nav.Link eventKey="dashboard">
                                    <i className="fas fa-columns"></i>
                                    <span> Dashboard</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="messages">
                                    <i className="fas fa-comments"></i>
                                    <span>Messages</span>
                                    <small className="unread-msg">23</small>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="settings">
                                    <i className="fas fa-user-cog"></i>
                                    <span>Profile Settings</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="change-password">
                                    <i className="fas fa-lock"></i>
                                    <span>Change Password</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="logout">
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </Nav.Link>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </div>
        </div>
    );
};
export default ClientDashboardSidebar;
