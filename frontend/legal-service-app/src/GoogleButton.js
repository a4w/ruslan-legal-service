import React from "react";
import GoogleLogin from "react-google-login";
import Config from "./Config";


const GoogleButton = ({register}) => {
    const responseGoogle = (response) => {
        console.log(response);
    };
    return (
        <GoogleLogin
            clientId={Config.google_client_id}
            buttonText={register ? " Register" : " Login"}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
        />
    );
};

export default GoogleButton;
