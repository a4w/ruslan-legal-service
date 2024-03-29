import React, {useEffect, useState, useContext} from "react";
import Nav from "react-bootstrap/Nav";
import {NavTab} from "react-router-tabs";
import StarRatings from "react-star-ratings";
import Img from "./Img";
import useRequests from "./useRequests";
import {LoadingOverlayContext} from "./App";

const LawyerDashboardSidebar = () => {
    const init = {
        account: {
            name: "",
            surname: "",
            phone: "",
            profile_picture: null,
        },
        lawyer_type: {type: ""},
        ratings_average: 0,
    };
    const [lawyer, setLawyer] = useState(init);
    const [account, setAccount] = useState(init.account);
    const {request, Logout} = useRequests();
    const loader = useContext(LoadingOverlayContext);
    useEffect(() => {
        loader.setLoadingOverlayText("Loading...");
        loader.setIsLoadingOverlayShown(true);
        request({url: "/lawyer/me", method: "GET"})
            .then((data) => {
                setLawyer(data.lawyer);
                setAccount(data.lawyer.account);
                loader.setIsLoadingOverlayShown(false);
            })
            .catch((err) => {});
    }, []);
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a className="booking-doc-img">
                        <Img src={account.profile_picture} alt="Lawyer's Photo" overwrite={false} />
                    </a>
                    <div className="profile-det-info">
                        <h3>{account.full_name ? `${account.full_name}` : "loading..."}</h3>

                        <div className="client-details">
                            <h5 className="mb-0">{lawyer.lawyer_type ? lawyer.lawyer_type.type : ""}</h5>
                            <StarRatings
                                rating={lawyer.ratings_average}
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
                                <NavTab exact to="/dashboard/schedule">
                                    <i className="fas fa-hourglass-start"></i>
                                    <span>Schedule Timings</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/calendar">
                                    <i className="fas fa-calendar"></i>
                                    <span>Calendar</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/reviews">
                                    <i className="fas fa-star"></i>
                                    <span>Reviews</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to="/dashboard/blogs">
                                    <i className="fas fa-edit"></i>
                                    <span>Blogs</span>
                                </NavTab>
                            </li>
                            <li>
                                <NavTab replace={false} exact to="/dashboard/chat">
                                    <i className="fas fa-comments"></i>
                                    <span>Messages</span>
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
export default LawyerDashboardSidebar;
