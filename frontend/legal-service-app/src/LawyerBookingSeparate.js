import React, {useState, useEffect, useContext} from "react"
import {ModalPortal} from "./ModalRouted"
import "./LawyerBooking.css"
import StarRatings from "react-star-ratings";
import useRequests from "./useRequests";
import {LoadingOverlayContext, AuthContext} from "./App";
import {useHistory, useLocation} from "react-router";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import AppointmentTimeForm from "./AppointmentTimeForm";
import {FaCheckDouble, FaTimes} from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import env from "./env"
import {Link} from "react-router-dom";



// Checkout states (steps)
const SELECT_SLOTS_STEP = 0;
const REVIEW_STEP = 1;
const PAY_STEP = 2;

// Load stripe
const stripe = loadStripe(env.stripe_api_key);

function LawyerBookingSeparate({lawyer_id, back}) {
    // Used deps and contexts
    const {request} = useRequests();
    const loader = useContext(LoadingOverlayContext);
    const [auth,] = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    // Check if logged in
    useEffect(() => {
        if (!auth.isLoggedIn) {
            history.push(`${back}/login`);
        }
    }, []);

    // load lawyer
    const [lawyer, setLawyer] = useState(null);
    useEffect(() => {
        loader.setIsLoadingOverlayShown(true);
        request({url: `/lawyer/${lawyer_id}`, method: "GET"})
            .then((data) => {
                console.log(data);
                setLawyer(data.lawyer);
            })
            .catch(() => {})
            .finally(() => {
                loader.setIsLoadingOverlayShown(false);
            })
    }, []);

    // Checkout state
    const [checkoutState, setCheckoutState] = useState(SELECT_SLOTS_STEP);

    // Time selection (step 1)
    const [heldAppointmentsData, setHeldAppointmentsData] = useState({
        clientSecret: null,
        summary: null,
        appointments: []
    });
    const handleTimeSelection = ({client_secret, total_price, currency_symbol, appointments}) => {
        setHeldAppointmentsData({
            clientSecret: client_secret,
            summary: {total_price, currency_symbol},
            appointments: appointments
        });
        setCheckoutState(1);
    };
    return (
        <>
            <ModalPortal>
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            {lawyer !== null && <div className="booking-container-popup">
                                <div className="row">
                                    <div className="col-12">
                                        <Link to={back} className="btn btn-link float-right">
                                            <FaTimes />
                                        </Link>
                                        <img src="/avatar.svg" className="lawyer-thumb" />
                                        <span className="lawyer-name">{lawyer.account.full_name}</span>
                                        <div className="lawyer-rating">
                                            <StarRatings
                                                rating={lawyer.ratings_average}
                                                starRatedColor="gold"
                                                starDimension="20px"
                                                starSpacing="0px"
                                                numberOfStars={5}
                                                name="rating"
                                            />&nbsp;<span className="text-xs">({lawyer.ratings_count})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="breadcrumbs-container">
                                            <Breadcrumb>
                                                <BreadcrumbItem active={checkoutState === SELECT_SLOTS_STEP}>Select slots</BreadcrumbItem>
                                                <BreadcrumbItem active={checkoutState === REVIEW_STEP}>Review</BreadcrumbItem>
                                                <BreadcrumbItem active={checkoutState === PAY_STEP}>Checkout</BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {checkoutState === SELECT_SLOTS_STEP && <CheckoutStepOne lawyer={lawyer} handleTimeSelection={handleTimeSelection} />}
                                        {checkoutState === REVIEW_STEP && <CheckoutStepTwo heldAppointmentsData={heldAppointmentsData} lawyer={lawyer} handleConfirm={() => {
                                            setCheckoutState(2);
                                        }} />}
                                        {checkoutState === PAY_STEP && <CheckoutStepThree client_secret={heldAppointmentsData.clientSecret} />}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    );
}

// Select slots
function CheckoutStepOne({lawyer, handleTimeSelection}) {
    return (<AppointmentTimeForm lawyer_id={lawyer.id} handleSelection={handleTimeSelection} />);
}

// Review
function CheckoutStepTwo({heldAppointmentsData, lawyer, handleConfirm}) {
    const [totals, setTotals] = useState({discount: 0, subtotal: 0});
    useEffect(() => {
        let discount_total = 0, subtotal = 0;
        heldAppointmentsData.appointments.map((appointment, i) => {
            const slot_original_price = lawyer.price_per_hour * appointment.duration / 60;
            const slot_discount = lawyer.discount_ends_in > 0 ? (lawyer.is_percent_discount ? lawyer.discount / 100 * lawyer.price_per_hour * appointment.duration / 60 : lawyer.discount) : 0;
            subtotal += slot_original_price;
            discount_total += slot_discount;
        })
        setTotals({discount: discount_total, subtotal: subtotal});
    }, [heldAppointmentsData]);
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <small className="d-block text-center">Your selection will be held for 15 minutes</small>
                    <div className="review-container">
                        <table className="table">
                            <tr>
                                <th>#</th>
                                <th>Slot time</th>
                                <th>Slot length</th>
                                <th>Slot price</th>
                                <th>Slot discount</th>
                                <th>Slot net</th>
                            </tr>
                            {heldAppointmentsData.appointments.map((appointment, i) => {
                                const slot_original_price = lawyer.price_per_hour * appointment.duration / 60;
                                const slot_discount = lawyer.discount_ends_in > 0 ? (lawyer.is_percent_discount ? lawyer.discount / 100 * lawyer.price_per_hour * appointment.duration / 60 : lawyer.discount) : 0;
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{new Date(appointment.appointment_time).toLocaleString()}</td>
                                        <td>{appointment.duration} Minutes</td>
                                        <td>{appointment.currency_symbol} {slot_original_price}</td>
                                        <td>{appointment.currency_symbol} {slot_discount}</td>
                                        <td>{appointment.currency_symbol} {appointment.price}</td>

                                    </tr>
                                );
                            })}
                            <tr className="totals">
                                <td colSpan={4}> </td>
                                <td>
                                    Subtotal
                                </td>
                                <td>
                                    {heldAppointmentsData.summary.currency_symbol} {totals.subtotal}
                                </td>
                            </tr>
                            <tr className="totals">
                                <td colSpan={4}> </td>
                                <td>
                                    Discount
                                </td>
                                <td>
                                    {heldAppointmentsData.summary.currency_symbol} {totals.discount}
                                </td>
                            </tr>
                            <tr className="totals">
                                <td colSpan={4}> </td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    {heldAppointmentsData.summary.currency_symbol} {heldAppointmentsData.summary.total_price}
                                </td>
                            </tr>
                        </table>
                        <button className="btn btn-primary float-right my-5" onClick={handleConfirm}>
                            <FaCheckDouble />&nbsp;Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function CheckoutStepThree({client_secret}) {
    return (
        <Elements stripe={stripe}>
            <CheckoutForm client_secret={client_secret} />
        </Elements>
    );

}

export default LawyerBookingSeparate;
