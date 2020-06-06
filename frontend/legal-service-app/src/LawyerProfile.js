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
    const courses = [{ id: 1 }, { id: 4 }, { id: 5 }];
    const experiences = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const awards = [{ id: 1 }, { id: 4 }, { id: 5 }];
    const services = ["service 1 ", "service 2", "service 3"];
    return (
        <div className="col-md-12 col-lg-9">
            <Bio />
            <Education courses={courses} />
            <Experience experiences={experiences} />
            <Awards awards={awards} />
            <Services services={services} />
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
const EducationItem = () => {
    return (
        <>
            <div className="experience-user">
                <div className="before-circle"></div>
            </div>
            <div className="experience-content">
                <div className="timeline-content">
                    <a href="#/" className="name">
                        Place
                    </a>
                    <div>Degree</div>
                    <span className="time">start year - end year</span>
                </div>
            </div>
        </>
    );
};
const Education = ({ courses }) => {
    return (
        <div className="widget education-widget">
            <h4 className="widget-title">Education</h4>
            <div className="experience-box">
                <ul className="experience-list">
                    {courses.map((course) => (
                        <li key={course.id}>
                            <EducationItem />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
const ExperienceItem = () => {
    return (
        <>
            <div className="experience-user">
                <div className="before-circle"></div>
            </div>
            <div className="experience-content">
                <div className="timeline-content">
                    <a href="#/" className="name">
                        Work Place
                    </a>
                    <span className="time">
                        Start date - End date (duration)
                    </span>
                </div>
            </div>
        </>
    );
};
const Experience = ({ experiences }) => {
    return (
        <div className="widget experience-widget">
            <h4 className="widget-title">Work & Experience</h4>
            <div className="experience-box">
                <ul className="experience-list">
                    {experiences.map((experience) => (
                        <li key={experience.id}>
                            <ExperienceItem />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
const Award = () => {
    return (
        <>
            {" "}
            <div className="experience-user">
                <div className="before-circle"></div>
            </div>
            <div className="experience-content">
                <div className="timeline-content">
                    <p className="exp-year">Date</p>
                    <h4 className="exp-title">Award Title</h4>
                    <p>Text</p>
                </div>
            </div>
        </>
    );
};
const Awards = ({ awards }) => {
    return (
        <div className="widget awards-widget">
            <h4 className="widget-title">Awards</h4>
            <div className="experience-box">
                <ul className="experience-list">
                    {awards.map((award) => (
                        <li key={award.id}>
                            <Award />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
const Services = ({ services }) => {
    return (
        <div className="service-list">
            <h4>Services</h4>
            <ul className="clearfix">
                {services.map((service) => (
                    <li key={service}>{service}</li>
                ))}
            </ul>
        </div>
    );
};

export default LawyerProfile;
