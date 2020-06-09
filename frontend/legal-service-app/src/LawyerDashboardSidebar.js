import React from "react";
import Nav from "react-bootstrap/Nav";

const LawyerDashboardSidebar = () => {
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a href="//" className="booking-lawyer-img">
                        Lawyer's Photo
                    </a>
                    <div className="profile-det-info">
                        <h3>Lawyer's Name</h3>

                        <div className="client-details">
                            <h5 className="mb-0">Lawyer's Area of expertice</h5>
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
                                <Nav.Link eventKey="appointments">
                                    <i className="fas fa-calendar-check"></i>
                                    <span>Appointments</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="clients">
                                    <i className="fas fa-user-injured"></i>
                                    <span>My Clients</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="schedule">
                                    <i className="fas fa-hourglass-start"></i>
                                    <span>Schedule Timings</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="invoices">
                                    <i className="fas fa-file-invoice"></i>
                                    <span>Invoices</span>
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link eventKey="reviews">
                                    <i className="fas fa-star"></i>
                                    <span>Reviews</span>
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
export default LawyerDashboardSidebar;
