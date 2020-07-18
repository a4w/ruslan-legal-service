import React from "react";
import StarRatings from "react-star-ratings";
import Countdown, {zeroPad} from "react-countdown";
import History from "./History";
import {Link} from "react-router-dom";
import Img from "./Img";
import Config from "./Config";

const LawyerCardList = ({lawyers, setPopUp}) => {
    console.log(lawyers);
    if (lawyers)
        return lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} setPopUp={setPopUp} lawyer={lawyer} />
        ));
    else return <LawyerCard />;
};
const LawyerCard = ({lawyer, setPopUp}) => {
    return (
        <div className="card ml-3" onMouseEnter={() => setPopUp(lawyer)}>
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="law-img" style={{maxHeight: "250px"}}>
                            <strong>{}</strong>
                            <Img className="img-fluid" src={lawyer.account.profile_picture} />
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
                                licenced in: {lawyer.years_licenced}. {lawyer.institution}
                            </p>
                            <p className="lawyer-department">
                                <strong>{lawyer.lawyer_type.type}</strong>
                            </p>
                            <div className="rating">
                                <StarRatings
                                    rating={parseFloat(lawyer.ratings_average)}
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
                            <div className="session-details">
                                <div>{lawyer.biography}</div>
                            </div>
                            <div className="session-services">
                            {lawyer.practice_areas &&
                            <>
                                {lawyer.practice_areas.map((area, i) =>{ 
                                    if(i < 2)
                                        return(<span key={area.id}>{area.area}</span>)
                                })}
                                {lawyer.practice_areas.length > 2 &&
                                    <Link to={{pathname: `/profile/${lawyer.id}`, state: {lawyer: lawyer}}}>
                                        {`+${lawyer.practice_areas.length - 2} more`}
                                    </Link>}
                            </>
                            }
                            </div>
                        </div>
                    </div>
                    <div className="lawyer-info-right">
                        <div className="session-infos">
                            <ul>
                                <li>
                                    <i class="far fa-comment"></i>{" "}
                                    {lawyer.ratings_count} Feedback
                                </li>
                                {lawyer.account.city &&
                                lawyer.account.country ? (
                                    <li>
                                        <i class="fas fa-map-marker-alt"></i>{" "}
                                        {`${lawyer.account.city}, ${lawyer.account.country}`}
                                    </li>
                                ) : (
                                    <li>
                                        <i class="fas fa-map-marker-alt"></i>{" "}
                                        -
                                    </li>
                                )}
                                <Discount
                                    secsTillEnd={new Date(lawyer.discount_end)}
                                    cost={lawyer.price_per_hour}
                                    costAfterDiscount={lawyer.discounted_price_per_hour}
                                    discount={lawyer.discount}
                                    isPercent={lawyer.is_percent_discount}
                                    currency = {lawyer.currency_symbol}
                                />
                            </ul>
                        </div>
                        <div className="session-booking">
                            <Link
                                className="view-pro-btn"
                                to={{
                                    pathname: `/profile/${lawyer.id}`,
                                    state: {lawyer: lawyer},
                                }}
                            >
                                View Profile
                            </Link>

                            <Link
                                className="apt-btn"
                                to={{
                                    pathname: `list/book-lawyer/${lawyer.id}`,
                                    state: {lawyer_id: "1"},
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

const Discount = ({secsTillEnd, cost, costAfterDiscount, isPercent, discount, currency}) => {
    return (
        <Countdown
            date={secsTillEnd}
            renderer={(props) =>
                LawyerCountDownRenderer({
                    ...props,
                    cost: cost,
                    discount: costAfterDiscount,
                    discountValue: discount,
                    isPercent: isPercent,
                    currency: currency? currency : Config.default_currency_symbol
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
    isPercent,
    discountValue,
    currency
}) => {
    if (completed) {
        return (
            <li>
                <i className="far fa-money-bill-alt"></i>
                <label className="text-lg text-primary">{`${currency}${cost}`}</label>
            </li>
        );
    } else {
        return (
            <>
                <li>
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <span className="text-md text-success">
                        {isPercent ?
                            `${discountValue}% discount` :
                            `${currency}${discountValue} discount`}
                    </span>
                </li>
                <li>
                    <i className="far fa-money-bill-alt"></i>
                    <label className="text-lg text-success">
                        {currency}{discount}
                        &nbsp;
                        <strike className="text-lg text-danger">
                            {`${currency} ${cost}`}
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
export {Discount};
