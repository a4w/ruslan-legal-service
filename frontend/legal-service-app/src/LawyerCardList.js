import React from "react";
import StarRatings from "react-star-ratings";
import Countdown, { zeroPad } from "react-countdown";
import History from "./History";
import { Link } from "react-router-dom";

const LawyerCardList = ({ lawyers }) => {
    if (lawyers)
        return lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ));
    else return <LawyerCard />;
};
// accreditations: Array []
// biography: null
// course: null
// discount: null
// discount_end: null
// discount_ends_in: null
// graduation_year: null
// id: 1
// institution: null
// is_percent_discount: null
// lawyer_type: null
// lawyer_type_id: null
// practice_areas: Array []
// price_per_slot: null
// ratings_average: 0
// ratings_count: 0
// regulator: null
// regulator_id: null
// slot_length: 3
// user_id: 2
// years_licenced: null
const LawyerCard = ({ lawyer }) => {
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
                                <strong>
                                    {lawyer.account.name +
                                        " " +
                                        lawyer.account.surname}
                                </strong>
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
                            <Link
                                className="view-pro-btn"
                                to={{
                                    pathname: "/profile",
                                    state: { detail: "test data" },
                                }}
                            >
                                View Profile
                            </Link>

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
