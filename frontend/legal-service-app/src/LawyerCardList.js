import React from "react";
import StarRatings from "react-star-ratings";
import Countdown, { zeroPad } from "react-countdown";

const LawyerCardList = ({ lawyers }) => {
    if (lawyers)
        return lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawer={lawyer} />
        ));
    else return <LawyerCard />;
};

const LawyerCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="lawyer-img">
                            <strong>Lawyer's Image</strong>
                        </div>
                        <div className="lawyer-info-cont">
                            <h4 className="lawyer-name">
                                <strong>Lawyer's Name</strong>
                            </h4>
                            <p className="lawyer-education">
                                Years Expert . Education
                            </p>
                            <p className="lawyer-department">
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
                                &nbsp;
                                <span className="d-inline-block text-xs average-rating">
                                    (number of clients rated, percentage)
                                </span>
                            </div>
                            <div className="session-details">
                                <div>Lawyers Bio</div>
                            </div>
                            <div className="session-services">
                                <span>Expertise 1</span>
                                <span> Expertise 2</span>
                            </div>
                        </div>
                    </div>
                    <div className="lawyer-info-right">
                        <div className="session-infos">
                            <ul>
                                <li>
                                    <i className="far fa-comment"></i> Feedback
                                </li>
                                <Discount
                                    secsTillEnd={5000}
                                    cost={400}
                                    costAfterDiscount={100}
                                />
                            </ul>
                        </div>
                        <div className="session-booking">
                            <a
                                className="view-pro-btn"
                                href="lawyer-profile.html"
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

const Discount = ({ secsTillEnd, cost, costAfterDiscount }) => {
    return (
        <Countdown
            date={Date.now() + secsTillEnd}
            renderer={(props) =>
                LawyerCountDownRenderer({
                    ...props,
                    cost: cost,
                    discount: costAfterDiscount,
                })
            }
        />
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
            <li>
                <i className="far fa-money-bill-alt"></i>
                <label className="text-lg text-primary">&pound;{cost}</label>
            </li>
        );
    } else {
        return (
            <>
                <li>
                    <i className="far fa-money-bill-alt"></i>
                    <label className="text-lg text-success">
                        &pound;{discount}
                        &nbsp;
                        <strike className="text-lg text-danger">
                            &pound;{cost}
                        </strike>
                    </label>
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
            </>
        );
    }
};

export default LawyerCardList;
export { Discount };
