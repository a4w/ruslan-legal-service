import React, {useState, useEffect} from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css"
import {toast} from "react-toastify";
import History from "./History";
import {FaCreditCard, FaLock} from "react-icons/fa";

const CheckoutForm = ({client_secret}) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Roboto, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value
                }
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // Continue
            toast.success("Thank you, the appointment is successfully reserved and will be shown on your dashboard shortly", {duration: 10000})
            History.push("/client-dashboard");
        }
    };
    return (
        <form id="payment-form" style={{margin: 'auto'}} onSubmit={handleSubmit}>
            <span className="text-xs d-block text-center mb-5"><FaLock className="text-success" />&nbsp;It's safe to pay on Lawbe. Are transactions are protected by SSL protection</span>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) :
                        " Pay"
                    }
                </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, you will be redirected to your dashboard for an overview
            </p>
        </form>
    );
};

export default CheckoutForm;
