import React, {useContext} from "react";
import StarRatings from "react-star-ratings";
import Countdown, {zeroPad} from "react-countdown";
import History from "./History";
import {Link} from "react-router-dom";
import RoundImg from "./RoundImg";
import Img, {AcImg} from "./Img";
import Config from "./Config";
import {AuthContext} from "./App";
import SpinnerButton from "./SpinnerButton";
import useRequests from "./useRequests";
import {toast} from "react-toastify";
import {FaCommentAlt} from "react-icons/fa";

const LawyerCardList = ({lawyers, setPopUp}) => {
    if (lawyers)
        return lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} setPopUp={setPopUp} lawyer={lawyer} />
        ));
    else return <LawyerCard />;
};
const LawyerCard = ({lawyer, setPopUp = () => {}}) => {
    const [auth,] = useContext(AuthContext);
    const {request} = useRequests();

    const startChat = (lawyer_id) => {
        const myID = auth.accountId;
        const url = `/chat/${myID}/${lawyer_id}`;
        request({url: url, method: "POST"})
            .then((response) => {
                History.push(`/client-dashboard/chat/${response.chat_id}`);
            })
            .catch(() => {
                toast.error("An error occured");
            })
    };
    return (
        <div className="card" onMouseOverCapture={() => setPopUp(lawyer)}>
            <div className="card-body">
                <div className="lawyer-widget">
                    <div className="lawyer-info-left">
                        <div className="law-img">
                            <RoundImg diameter={150} alt={lawyer.full_name} src={lawyer.account.profile_picture} />
                        </div>
                        <div className="lawyer-info-cont">
                            <h4 className="lawyer-name text-left">
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

                            <div className="session-services">
                                {lawyer.accreditations &&
                                    <>
                                        {lawyer.accreditations.map((accreditation, i) => {
                                            if (i < 2) {
                                                return (
                                                    <>
                                                        <AcImg style={{maxHeight: '50px', marginRight: '5px'}} accreditation={accreditation} />
                                                    </>
                                                );
                                            }
                                        })}
                                    </>
                                }
                            </div>
                            <div className="session-services">
                                {lawyer.practice_areas &&
                                    <>
                                        {lawyer.practice_areas.map((area, i) => {
                                            if (i < 2)
                                                return (<span key={area.id}>{area.area}</span>)
                                        })}
                                        {lawyer.practice_areas.length > 2 &&
                                            <Link to={{pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`, state: {lawyer: lawyer}}}>
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
                                    discount={lawyer.discount}
                                    isPercent={lawyer.is_percent_discount}
                                    currency={lawyer.currency_symbol}
                                />
                                <li>
                                    {auth.isLoggedIn && auth.accountType === "CLIENT" &&
                                        <button
                                            className="btn btn-primary btn-xs btn-block"
                                            onClick={() => {
                                                startChat(lawyer.account.id);
                                            }}
                                        >
                                            <FaCommentAlt />
                                            &nbsp;Message lawyer
                                        </button>
                                    }
                                </li>
                            </ul>
                        </div>

                        <div className="session-booking">
                            <Link
                                className="view-pro-btn"
                                to={{
                                    pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
                                    state: {lawyer: lawyer},
                                }}
                            >
                                View Profile
                            </Link>


                            <Link
                                className="apt-btn"
                                to={{
                                    pathname: `list/book-lawyer/${lawyer.id}`,
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
                    currency: currency ? currency : Config.default_currency_symbol
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
                    <i className="far fa-money-bill-alt"></i>
                    <label className="text-lg text-success">
                        <span style={{fontWeight: 'bold'}}>{currency}{discount}</span>
                        &nbsp;
                        <strike className="text-lg text-danger">
                            {`${currency} ${cost}`}
                        </strike>
                        &nbsp;
                        <strong className="text-xs">
                            ({isPercent ?
                                `-${discountValue}%` :
                                `-${currency}${discountValue}`})
                        </strong>
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
export {Discount, LawyerCard};
