import React, {useState, useEffect, useContext} from "react";
import StarRatings from "react-star-ratings";
import {Discount} from "./LawyerCardList";
import LawyerReviews from "./LawyerReviews";
import {
    Link,
    Router,
    Switch,
    Route,
    matchPath,
    Redirect,
    NavLink,
} from "react-router-dom";
import History from "./History";
import "./Tabs.css";
import AppointmentTimeForm from "./AppointmentTimeForm";
import BlogList from "./BlogList";
import Img from "./Img";
import LawyerBooking from "./LawyerBooking";
import useRequests from "./useRequests";
import {AuthContext} from "./App"
import {toast} from "react-toastify";
import SpinnerButton from "./SpinnerButton";
import {FaCommentAlt} from "react-icons/fa";

const LawyerProfile = ({match}) => {
    const [lawyer, setLawyer] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        const lawyerID = match.params.LawyerId;
        request({url: `lawyer/${lawyerID}`, method: "GET"})
            .then((data) => {
                setLawyer(data.lawyer);
                console.log(data.lawyer);
            })
            .catch((e) => {});
        console.log();
    }, []);

    return (
        <Router history={History}>
            <div className="content">
                {lawyer && (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ProfileCard lawyer={lawyer} match={match} />
                                <Details lawyer={lawyer} match={match} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

const ProfileCard = ({lawyer}) => {
    console.log("shit in card : ", lawyer);
    const account = lawyer.account;
    const [auth,] = useContext(AuthContext);
    const {request} = useRequests();
    const [loading, setLoading] = useState(false);
    const StartChat = () => {
        setLoading(true);
        const myID = auth.accountId;
        const url = `/chat/${myID}/${lawyer.id}`;
        request({url: url, method: "POST"})
            .then(() => {
                History.push(`/chat/${lawyer.id - 1}`);
            })
            .catch(() => {
                toast.error("An error occured");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div className="card">
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="law-img" style={{maxHeight: "250px"}}>
                            <Img
                                src={account.profile_picture}
                                className="img-fluid round-profile-card"
                                alt="Lawyer Profile"
                            />
                        </div>
                        <div className="lawyer-info-cont">
                            <h4 className="lawyer-name">
                                {`${lawyer.account.name} ${lawyer.account.surname}`}
                            </h4>
                            <p className="lawyer-department">
                                {lawyer.lawyer_type.type}
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
                                    ({lawyer.ratings.length})
                                </span>
                            </div>
                            <div className="session-services">
                                {lawyer.accreditations &&
                                    lawyer.accreditations.map((acc) => (
                                        <span key={acc.id}>{acc.accreditation}</span>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="lawyer-info-right">
                        <div className="session-infos">
                            <ul>
                                <li>
                                    <i className="far fa-comment"></i>{" "}
                                    {lawyer.ratings_count} Feedback
                                </li>
                                {lawyer.account.city &&
                                    lawyer.account.country ? (
                                        <li>
                                            <i className="fas fa-map-marker-alt"></i>{" "}
                                            {`${lawyer.account.city}, ${lawyer.account.country}`}
                                        </li>
                                    ) : (
                                        <li>
                                            <i className="fas fa-map-marker-alt"></i>{" "}
                                        -
                                        </li>
                                    )}
                                <Discount
                                    secsTillEnd={new Date(lawyer.discount_end)}
                                    cost={lawyer.price_per_hour}
                                    costAfterDiscount={lawyer.discounted_price_per_hour}
                                    isPercent={lawyer.is_percent_discount}
                                    discount={lawyer.discount}
                                    currency={lawyer.currency_symbol}
                                />
                            </ul>
                        </div>
                        {auth.isLoggedIn && auth.accountType === "CLIENT" && <div className="lawyer-action">
                            <SpinnerButton className="btn btn-white msg-btn" onClick={StartChat} loading={loading}>
                                <FaCommentAlt />&nbsp;Chat with this lawyer!
                            </SpinnerButton>
                        </div>}
                        <div className="session-booking">
                            <Link
                                className="apt-btn"
                                to={{
                                    pathname: `${History.location.pathname}/book-lawyer/${lawyer.id}`,
                                    state: {lawyer_id: lawyer.id},
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

const Details = ({lawyer, match}) => {
    const path = match.url;
    console.log(match);
    const [blogs, setBlogs] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        request({url: `/blogs/lawyer/${lawyer.id}`, method: "GET"})
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {});
    }, []);
    return (
        <div className="card">
            <div className="card-body pt-0">
                <NavBar lawyer={lawyer} match={match} />
                <div className="tab-content pt-0">
                    <Switch>
                        <Route exact path={`${path}`}>
                            {" "}
                            <Redirect to={`${path}/overview`} />
                        </Route>
                        <Route path={`${path}/overview`}>
                            {" "}
                            <Overview lawyer={lawyer} />{" "}
                        </Route>
                        <Route path={`${path}/reviews`}>
                            <LawyerReviews lawyer={lawyer} />
                        </Route>
                        <Route path={`${path}/hours`}>
                            <LawyerBooking LawyerId={lawyer.id} />
                        </Route>
                        <Route path={`${path}/blogs`}>
                            {blogs && <BlogList blogs={blogs} />}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
const NavBar = ({match}) => {
    const path = match.url;
    console.log(path);

    return (
        <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                    <NavLink replace to={`${path}/overview`}>Overview</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink replace to={`${path}/reviews`}>Reviews</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink replace to={`${path}/hours`}>Business Hours</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink replace to={`${path}/blogs`}>Blogs</NavLink>
                </li>
            </ul>
        </nav >
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
    } = {...lawyer};

    const specializations = [
        `Regulated By: ${regulator ? regulator.regulator : ""}`,
        `Year licenced: ${years_licenced}`,
    ];
    return (
        <div className="col-md-12 col-lg-9">
            <PracticeAreas lawyer={lawyer} />
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
const PracticeAreas = ({lawyer}) => {
    return (
        <div className="widget about-widget">
            <h4 className="widget-title">Practice Areas</h4>
            <div className="session-services mb-0">
                <p>
                    {lawyer.practice_areas &&
                        lawyer.practice_areas.map((area) => (
                            <span key={area.id}>{area.area}</span>
                        ))}
                </p>
            </div>
        </div>
    );
}
const Bio = ({bio}) => {
    return (
        <div className="widget about-widget">
            <h4 className="widget-title">About Me</h4>
            <p>{bio}</p>
        </div>
    );
};

const Education = ({course, institution, graduation_year}) => {
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
const Specializations = ({specializations}) => {
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
