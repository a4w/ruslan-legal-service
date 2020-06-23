import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { NavTab } from "react-router-tabs";
import StarRatings from "react-star-ratings";
import { request } from "./Axios";

const LawyerDashboardSidebar = () => {
    const [rating, setRating] = useState(0);
    useEffect(() => {
        request({
            url: `/rating/${1}`,
            method: "GET",
        })
            .then((data) => {
                console.log(data);
                // setRating(data);
            })
            .catch((e) => {});
    }, []);
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
                            <StarRatings
                                rating={rating}
                                starRatedColor="gold"
                                starDimension="20px"
                                starSpacing="0px"
                                numberOfStars={5}
                                name="rating"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                <Nav className="dashboard-menu">
                    <div className="dashboard-menu">
                        <ul>
                            <li>
                                <NavTab exact to="/dashboard/status">
                                    <i className="fas fa-columns"></i>
                                    <span> Dashboard</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/appointments">
                                    <i className="fas fa-calendar-check"></i>
                                    <span>Appointments</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/clients">
                                    <i className="fas fa-user-injured"></i>
                                    <span>My Clients</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/schedule">
                                    <i className="fas fa-hourglass-start"></i>
                                    <span>Schedule Timings</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/invoices">
                                    <i className="fas fa-file-invoice"></i>
                                    <span>Invoices</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/reviews">
                                    <i className="fas fa-star"></i>
                                    <span>Reviews</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/messages">
                                    <i className="fas fa-comments"></i>
                                    <span>Messages</span>
                                    <small className="unread-msg">23</small>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/settings">
                                    <i className="fas fa-user-cog"></i>
                                    <span>Profile Settings</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/change-password">
                                    <i className="fas fa-lock"></i>
                                    <span>Change Password</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/logout">
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
export default LawyerDashboardSidebar;
