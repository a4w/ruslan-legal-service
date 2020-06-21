import React from "react";
import StarRatings from "react-star-ratings";
import { Discount } from "./LawyerCardList";
import LawyerReviews from "./LawyerReviews";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

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
                            <Link
                                className="apt-btn"
                                to={{
                                    pathname: "/book",
                                    pathname: "/book",
                                    state: { lawyer_id: "1" },
                                }}
                            >
                                Book Appointment
                            </Link>
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
                        <div className="tab-content pt-0">
                            <Tab.Pane eventKey="overview">
                                {" "}
                                <Overview />{" "}
                            </Tab.Pane>
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

const Overview = () => {
    const course = { id: 1 };
    const specializations = [
        "specializations 1 ",
        "specializations 2",
        "specializations 3",
        "specializations 4",
    ];
    return (
        <div className="col-md-12 col-lg-9">
            <Bio />
            <Education course={course} />
            <Specializations specializations={specializations} />
        </div>
    );
};
const Bio = () => {
    return (
        <div className="widget about-widget">
            <h4 className="widget-title">About Me</h4>
            <p>Text. Bio. Wtvr</p>
        </div>
    );
};
const Education = ({ course }) => {
    return (
        <div className="widget education-widget">
            <h4 className="widget-title">Education</h4>
            <div className="experience-box">
                <ul className="experience-list">
                    <li key={course.id}>
                        <div className="experience-user">
                            <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                            <div className="timeline-content">
                                <a href="#/" className="name">
                                    Place
                                </a>
                                <div>Degree</div>
                                <span className="time">
                                    start year - end year
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
const Specializations = ({ specializations }) => {
    return (
        <div className="service-list">
            <h4>Specializations</h4>
            <ul className="clearfix">
                {specializations.map((specialization) => (
                    <li key={specialization}>{specialization}</li>
                ))}
            </ul>
        </div>
    );
};
export default LawyerProfile;
