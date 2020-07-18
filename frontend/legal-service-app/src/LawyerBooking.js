import React, {useState, useEffect, useContext} from "react";
import StarRatings from "react-star-ratings";
import LawyerCardList from "./LawyerCardList";
import AppointmentTimeForm from "./AppointmentTimeForm";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";
import useRequests from "./useRequests";
import env from "./env"
import Config from "./Config";
import moment from "moment";
import {LoadingOverlayContext, AuthContext} from "./App";
import {useHistory, useLocation} from "react-router";
import Img from "./Img";
import { Link } from "react-router-dom";

const stripe = loadStripe(env.stripe_api_key);

const LawyerBooking = ({LawyerId}) => {
    const [lawyer, setLawyer] = useState(null);
    const [isTimeSelected, setIsTimeSelected] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [orderData, setOrderData] = useState({total_price: 0, currency_symbol: Config.default_currency_symbol});
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const {request} = useRequests();
    const loader = useContext(LoadingOverlayContext);
    const [auth,] = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        console.log(auth);
        if (!auth.isLoggedIn) {
            history.push(`${location.pathname}/login`);
        }
    }, [])
    useEffect(() => {
        loader.setIsLoadingOverlayShown(true);
        request({url: `/lawyer/${LawyerId}`, method: "GET"})
            .then((data) => {
                setLawyer(data.lawyer);
            })
            .catch((err) => {})
            .finally(() => {
                loader.setIsLoadingOverlayShown(false);
            })

    }, []);

    const handleTimeSelection = ({client_secret, total_price, currency_symbol, appointments}) => {
        setClientSecret(client_secret);
        setOrderData({
            total_price,
            currency_symbol,
        })
        setSelectedAppointments(appointments);
        setIsTimeSelected(true);
    };

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    {lawyer && <LawyerCardRoundded lawyer={lawyer} />}
                    <div className={isTimeSelected ? "col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3" : "col-12"} style={{minHeight: '400px'}}>
                        {!isTimeSelected && <AppointmentTimeForm lawyer_id={LawyerId} handleSelection={handleTimeSelection} />}
                        {isTimeSelected &&
                            <>
                                <h1 className="text-center">Checkout</h1>
                                <div className="m-2">
                                    <ol>
                                        {selectedAppointments.map((appointment) => {
                                            return (
                                                <>
                                                    <li>
                                                        <div className="d-block text-center">
                                                            <span><b>{new Date(appointment.appointment_time).toLocaleString()}</b> for <b>{appointment.duration} minutes</b></span>
                                                            <span>&nbsp;:&nbsp;<b>{orderData.currency_symbol} {appointment.price}</b></span>
                                                        </div>
                                                    </li>
                                                </>
                                            );
                                        })}
                                    </ol>
                                </div>
                                <h4 className="text-center">Total: {orderData.currency_symbol} {orderData.total_price}</h4>
                                <Elements stripe={stripe}>
                                    <CheckoutForm client_secret={clientSecret} />
                                </Elements>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
const TodayIs = () => {
    const date = new Date();
    const _date = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const WeekDay = date.toLocaleString("en-GB", {
        weekday: "long",
    });

    return (
        <div class="row">
            <div class="col-12 col-sm-4 col-md-6">
                <h4 class="mb-1">{_date}</h4>
                <p class="text-muted">{WeekDay}</p>
            </div>
        </div>
    );
};

const LawyerCardRoundded = ({ lawyer }) => {
    const { account } = { ...lawyer };
    const imgStyle = {
        borderRadius: "120px",
        height: "120px",
        width: "120px",
        objectFit: "cover",
    };
    return (
        <div style={{ width: "100%", marginBottom: "3%" }}>
            <div className="profile-info-widget justify-content-center">
                <Link
                    to={`profile/${lawyer.id}`}
                    className="booking-lawyer-img"
                >
                    <Img
                        src={account.profile_picture}
                        className="img-fluid"
                        style={imgStyle}
                    />
                </Link>
            </div>
            <div
                className="profile-det-info mt-4"
                style={{
                    textAlign: "center",
                }}
            >
                <h2>{`${account.name} ${account.surname}`}</h2>
            </div>
            <div
                className="justify-content-center"
                style={{
                    display: "flex",
                }}
            >
                <StarRatings
                    rating={lawyer.ratings_average}
                    starRatedColor="gold"
                    starDimension="20px"
                    starSpacing="0px"
                    numberOfStars={5}
                    name="rating"
                />
            </div>
        </div>
    );
};

const LawyerCard = ({lawyer}) => {
    return (lawyer &&
        <div className="card">
            <div className="card-body">
                <div className="booking-lawyer-info">
                    <a
                        href="lawyer-profile.html"
                        className="booking-lawyer-img"
                    >
                        <img src={lawyer.account.profile_picture} alt="Lawyer Image" />
                    </a>
                    <div className="booking-info">
                        <h4>
                            <a href="lawyer-profile.html"> {`${lawyer.account.name} ${lawyer.account.surname}`}</a>
                        </h4>
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
                        <p className="text-muted mb-0">
                            <i className="fas fa-map-marker-alt"></i> {`${lawyer.account.city}, ${lawyer.account.country}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LawyerBooking;
