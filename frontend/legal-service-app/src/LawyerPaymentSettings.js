import React, {useEffect, useState} from "react"
import useRequests from "./useRequests";

const PaymentSettings = () => {
    const [connectionLink, setConnectionLink] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        // Load connection link
        request({
            url: 'lawyer/stripe-connect',
            method: 'GET'
        }).then(response => {
            setConnectionLink(response.connection_link);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <>
            {connectionLink !== null && <a target="_blank" href={connectionLink}>
                <img src="/stripe-connect-button.png" style={{maxWidth: '100%', maxHeight: '40px'}} />
            </a>}

        </>
    );
};

export default PaymentSettings;
