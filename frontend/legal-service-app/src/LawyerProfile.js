import React from "react";
import StarRatings from "react-star-ratings";
import { Discount } from "./LawyerCardList";

const LawyerProfile = () => {
    return (
        <div className="content">
            <div className="container">
                <ProfileCard />
                <Test />
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
                                    secsTillEnd={5000}
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

export default LawyerProfile;
