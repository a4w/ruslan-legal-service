import React from "react";
import StarRatings from "react-star-ratings";

function LawyerList() {
    return <LawyerCard />;
}

const LawyerCardList = () => {};
const LawyerCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="doctor-widget">
                    <div className="doc-info-left">
                        <div className="doctor-img">
                            <strong>Lawyer's Image</strong>
                        </div>
                        <div className="doc-info-cont">
                            <h4 className="doc-name">
                                <strong>Lawyer's Name</strong>
                            </h4>
                            <p className="lawyer-education">
                                Years Expert . Education
                            </p>
                            <p className="doc-department">
                                <strong>Lawyer's expertise</strong>
                            </p>
                            <div className="rating">
                                <StarRatings
                                    rating={4}
                                    starRatedColor="gold"
                                    starDimension="20px"
                                    starSpacing="0px"
                                    numberOfStars={5}
                                    name="rating"
                                />
                                <span className="d-inline-block average-rating">
                                    (number of clients rated)
                                </span>
                            </div>
                            <div className="clinic-details">
                                <div>Lawyers Bio</div>
                            </div>
                            <div className="clinic-services">
                                <span>Expertise 1</span>
                                <span> Expertise 2</span>
                            </div>
                        </div>
                    </div>
                    <div className="doc-info-right">
                        <div className="clini-infos">
                            <ul>
                                <li>
                                    <i className="far fa-thumbs-up"></i> 99%
                                </li>
                                <li>
                                    <i className="far fa-comment"></i> 35
                                    Feedback
                                </li>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    Lawyer's Location
                                </li>
                                <li>
                                    <i className="far fa-money-bill-alt"></i>{" "}
                                    $100 - $400{" "}
                                    <i
                                        className="fas fa-info-circle"
                                        data-toggle="tooltip"
                                        title="Lorem Ipsum"
                                    ></i>
                                </li>
                                <li>
                                    <i className="far fa-money-bill-alt"></i>{" "}
                                    Ends in <strong>Time</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="clinic-booking">
                            <a
                                className="view-pro-btn"
                                href="doctor-profile.html"
                            >
                                View Profile
                            </a>
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

export default LawyerList;
