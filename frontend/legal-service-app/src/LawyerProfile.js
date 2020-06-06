import React from "react";
import StarRatings from "react-star-ratings";
import { Discount } from "./LawyerCardList";
import LawyerReviews from "./LawyerReviews";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const LawyerProfile = () => {
    return (
        <div className="content">
            <div className="container">
                <ProfileCard />
                <Details />
            </div>
        </div>
    );
};

const ProfileCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="lawyer-img">Lawyer's Image</div>
                        <div className="lawyer-info-cont">
                            <h4 className="lawyer-name">Dr. Darren Elder</h4>
                            <p className="lawyer-speciality">
                                Area of expertise
                            </p>
                            <p className="lawyer-department">Type?</p>
                            <div className="rating">
                                <StarRatings
                                    rating={4}
                                    starRatedColor="gold"
                                    starDimension="20px"
                                    starSpacing="0px"
                                    numberOfStars={5}
                                    name="rating"
                                />
                                &nbsp;
                                <span className="d-inline-block text-xs average-rating">
                                    (number of clients rated, percentage)
                                </span>
                            </div>
                            <div className="session-services">
                                <span>Service 1 </span>
                                <span>Service 2</span>
                            </div>
                        </div>
                    </div>
                    <div className="lawyer-info-right">
                        <div className="session-infos">
                            <ul>
                                <li>
                                    <i className="far fa-comment"></i> ##
                                    Feedback
                                </li>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    City, Country
                                </li>
                                <Discount
                                    secsTillEnd={0}
                                    cost={400}
                                    costAfterDiscount={100}
                                />
                            </ul>
                        </div>
                        <div className="lawyer-action"></div>
                        <div className="session-booking">
                            <a className="apt-btn" href="booking.html">
                                Book Appointment
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Details = () => {
    return (
        <div className="card">
            <div className="card-body pt-0">
                <Tab.Container id="details" defaultActiveKey="overview">
                    <NavBar />
                    <Tab.Content>
                        <div class="tab-content pt-0">
                            <Tab.Pane eventKey="overview"> soon </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                                <LawyerReviews />
                            </Tab.Pane>
                            <Tab.Pane eventKey="hours">
                                {" Hours will be added when it's time 🌚🌚"}
                            </Tab.Pane>
                        </div>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};
const NavBar = () => {
    return (
        <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                    <Nav.Link eventKey="overview">Overview</Nav.Link>
                </li>
                <li className="nav-item">
                    <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                </li>
                <li className="nav-item">
                    <Nav.Link eventKey="hours">Business Hours</Nav.Link>
                </li>
            </ul>
        </nav>
    );
};
export default LawyerProfile;
