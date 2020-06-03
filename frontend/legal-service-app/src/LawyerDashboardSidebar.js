import React from "react";

const LawyerDashboardSidebar = () => {
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a href="//" className="booking-lawyer-img">
                        <img
                            src="assets/img/doctors/lawyer-thumb-02.jpg"
                            alt="User"
                        />
                    </a>
                    <div className="profile-det-info">
                        <h3>Dr. Darren Elder</h3>

                        <div className="client-details">
                            <h5 className="mb-0">
                                BDS, MDS - Oral & Maxillofacial Surgery
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                <nav className="dashboard-menu">
                    <ul>
                        <li className="active">
                            <a href="lawyer-dashboard.html">
                                <i className="fas fa-columns"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="appointments.html">
                                <i className="fas fa-calendar-check"></i>
                                <span>Appointments</span>
                            </a>
                        </li>
                        <li>
                            <a href="my-patients.html">
                                <i className="fas fa-user-injured"></i>
                                <span>My Patients</span>
                            </a>
                        </li>
                        <li>
                            <a href="schedule-timings.html">
                                <i className="fas fa-hourglass-start"></i>
                                <span>Schedule Timings</span>
                            </a>
                        </li>
                        <li>
                            <a href="invoices.html">
                                <i className="fas fa-file-invoice"></i>
                                <span>Invoices</span>
                            </a>
                        </li>
                        <li>
                            <a href="reviews.html">
                                <i className="fas fa-star"></i>
                                <span>Reviews</span>
                            </a>
                        </li>
                        <li>
                            <a href="chat-lawyer.html">
                                <i className="fas fa-comments"></i>
                                <span>Message</span>
                                <small className="unread-msg">23</small>
                            </a>
                        </li>
                        <li>
                            <a href="lawyer-profile-settings.html">
                                <i className="fas fa-user-cog"></i>
                                <span>Profile Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="social-media.html">
                                <i className="fas fa-share-alt"></i>
                                <span>Social Media</span>
                            </a>
                        </li>
                        <li>
                            <a href="lawyer-change-password.html">
                                <i className="fas fa-lock"></i>
                                <span>Change Password</span>
                            </a>
                        </li>
                        <li>
                            <a href="index.html">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
export default LawyerDashboardSidebar;
