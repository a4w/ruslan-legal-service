import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { Discount } from "./LawyerCardList";
import LawyerReviews from "./LawyerReviews";
import {
    Link,
    BrowserRouter,
    Switch,
    Route,
    matchPath,
} from "react-router-dom";
import History from "./History";
import { request } from "./Axios";
// import "./Tabs.css";

const LawyerProfile = ({ match }) => {
    const initLawyer = {
        account: { id: 2, name: "", surname: "" },
        accreditations: [],
        biography: "",
        course: "",
        discount: "",
        discount_end: "",
        graduation_year: "",
        institution: "",
        is_percent_discount: "",
        lawyer_type: "",
        practice_areas: [],
        price_per_slot: "",
        ratings: [],
        regulator: "",
        slot_length: 3,
        years_licenced: "",
    };
    const [lawyer, setLawyer] = useState(initLawyer);
    useEffect(() => {
        if (History.location.state) {
            setLawyer(History.location.state.lawyer);
        } else {
            //fetch lawyer from database
            const lawyerID = match.params.LawyerId;
            request({ url: `lawyer/${lawyerID}`, method: "GET" })
                .then((data) => {
                    setLawyer(data.lawyer);
                    console.log(data.lawyer);
                })
                .catch((e) => {});
            console.log();
        }
    }, []);

    return (
        <div className="content">
            <div className="container">
                <ProfileCard lawyer={lawyer} match={match} />
                <Details lawyer={lawyer} match={match} />
            </div>
        </div>
    );
};

const ProfileCard = ({ lawyer }) => {
    console.log("shit in card : ", lawyer);

    return (
        <div className="card">
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="lawyer-img">
                            <img
                                src={lawyer.pp}
                                className="img-fluid"
                                alt="Lawyer Profile"
                            />
                        </div>
                        <div className="lawyer-info-cont">
                            <h4 className="lawyer-name">
                                {" "}
                                {lawyer.account.name +
                                    " " +
                                    lawyer.account.surname}
                            </h4>
                            <p className="lawyer-speciality">
                                {lawyer.practice_areas &&
                                    lawyer.practice_areas.map((area) => (
                                        <h6 key={area}>{area}</h6>
                                    ))}
                            </p>
                            <p className="lawyer-department">
                                {lawyer.lawyer_type}
                            </p>
                            <div className="rating">
                                <StarRatings
                                    rating={lawyer.ratings_average}
                                    starRatedColor="gold"
                                    starDimension="20px"
                                    starSpacing="0px"
                                    numberOfStars={5}
                                    name="rating"
                                />
                                &nbsp;
                                <span className="d-inline-block text-xs average-rating">
                                    ({lawyer.ratings_count})
                                </span>
                            </div>
                            <div className="session-services">
                                {lawyer.accreditations &&
                                    lawyer.accreditations.map((acc) => (
                                        <span key={acc}>{acc}</span>
                                    ))}
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
                                    {lawyer.city, lawyer.country}
                                </li>
                                <Discount
                                    secsTillEnd={lawyer.discount_end}
                                    cost={lawyer.price_per_slot}
                                    costAfterDiscount={100}
                                    isPercent={lawyer.is_percent_discount}
                                    discount={lawyer.discount}
                                />
                            </ul>
                        </div>
                        <div className="lawyer-action"></div>
                        <div className="session-booking">
                            <Link
                                className="apt-btn"
                                to={{
                                    pathname: `/book-lawyer/${lawyer.id}`,
                                    state: { lawyer_id: lawyer.id },
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

const Details = ({ lawyer, match }) => {
    const path = match.path;
    console.log(match);

    return (
        <div className="card">
            <div className="card-body pt-0">
                <BrowserRouter>
                    <NavBar lawyer={lawyer} match={match} />
                    <Switch>
                        <div className="tab-content pt-0">
                            <Route path={`/${path}/overview`}>
                                {" "}
                                <Overview />{" "}
                            </Route>
                            <Route path={`/${path}/reviews`}>
                                <LawyerReviews />
                            </Route>
                            <Route path={`/${path}/hours`}>
                                {" Hours will be added when it's time 🌚🌚"}
                            </Route>
                        </div>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
};
const NavBar = ({ match }) => {
    const path = match.path;
    console.log(path);

    return (
        <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                    <Link to={`/${path}/overview`}>Overview</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${path}/reviews`}>Reviews</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${path}/hours`}>Business Hours</Link>
                </li>
            </ul>
        </nav>
    );
};

const Overview = ({lawyer}) => {
    const {
        biography,
        course,
        graduation_year,
        institution,
        regulator,
        years_licenced,
    } = { ...lawyer };
    const specializations = [
        `Regulated By: ${regulator}`,
        `Years licenced: ${years_licenced}`,
    ];
    return (
        <div className="col-md-12 col-lg-9">
            <Bio bio={biography} />
            <Education
                course={course}
                institution={institution}
                graduation_year={graduation_year}
            />
            <Specializations specializations={specializations} />
        </div>
    );
};
const Bio = ({bio}) => {
    return (
        <div className="widget about-widget">
            <h4 className="widget-title">About Me</h4>
            <p>{bio}</p>
        </div>
    );
};

const Education = ({ course, institution, graduation_year }) => {
    return (
        <div className="widget education-widget">
            <h4 className="widget-title">Education</h4>
            <div className="experience-box">
                <ul className="experience-list">
                    <li>
                        <div className="experience-user">
                            <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                            <div className="timeline-content">
                                <a href="#/" className="name">
                                    {institution}
                                </a>
                                <div>{course}</div>
                                <span className="time">
                                    {graduation_year}
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
            <h4>More</h4>
            <ul className="clearfix">
                {specializations.map((specialization) => (
                    <li key={specialization}>{specialization}</li>
                ))}
            </ul>
        </div>
    );
};
export default LawyerProfile;
