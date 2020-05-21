import React from "react";
import StarRatings from "react-star-ratings";
import Countdown, { zeroPad } from "react-countdown";

function LawyerList() {
    return (
        <>
            <LawyerCard />
        </>
    );
}

// eslint-disable-next-line no-unused-vars
const LawyerCardList = (lawyers) => {
    return (
        // eslint-disable-next-line no-undef
        lawyers.map((lawyer) => <LawyerCard key={lawyer.id} lawer={lawyer} />)
    );
};
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
                                <span className="d-inline-block text-xs average-rating">
                                    (number of clients rated, percentage)
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
                                <li>Feedback</li>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    Lawyer's Location
                                </li>
                                <li>
                                    <Countdown
                                        date={Date.now() + 5000}
                                        renderer={(props) =>
                                            LawyerCountDownRenderer({
                                                ...props,
                                                cost: 400,
                                                discount: 100,
                                            })
                                        }
                                    />
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

const LawyerCountDownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    cost,
    discount,
}) => {
    if (completed) {
        return (
            <ul>
                <li>
                    <p className="text-lg text-primary">&pound;{cost}</p>
                </li>
            </ul>
        );
    } else {
        return (
            <ul>
                <li>
                    <p className="text-lg text-success">&pound;{discount}
                    &nbsp;
                    <strike className="text-lg text-danger">
                        &pound;{cost}
                    </strike>
                    </p>
                </li>
                <li>
                    Ends in <strong>{days}</strong>{" "}
                    {days !== 1 ? "days" : "day"} and{" "}
                    <strong>
                        <span>
                            {zeroPad(hours)}:{zeroPad(minutes)}:
                            {zeroPad(seconds)}
                        </span>
                    </strong>
                </li>
            </ul>
        );
    }
};

export default LawyerList;
