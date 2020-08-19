import React, {useEffect, useState} from "react"
import useRequests from "./useRequests";

const PaymentSettings = () => {
    const [connectionLink, setConnectionLink] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const {request} = useRequests();
    useEffect(() => {
        // Load connection link
        request({
            url: 'lawyer/stripe-connect',
            method: 'GET'
        }).then(response => {
            setConnectionLink(response.connection_link);
            setIsConnected(response.is_connected);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <>
            <span>Stripe account status: </span><span className={"badge badge-pill text-uppercase badge-" + (isConnected ? 'success' : 'danger')}>{isConnected ? "Connected" : "Not connected"}</span>
            <br />
            <br />
            {connectionLink !== null && <a target="_blank" href={connectionLink}>
                <img src="/stripe-connect-button.png" style={{maxWidth: '100%', maxHeight: '40px'}} />
            </a>}

        </>
    );
};

export default PaymentSettings;
