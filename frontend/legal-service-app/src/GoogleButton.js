import React from "react";
import GoogleLogin from "react-google-login";
import Config from "./Config";

const GoogleButton = ({ register }) => {
    const responseGoogle = (response) => {
        console.log(response);
    };
    return (
        <GoogleLogin
            clientId={Config.google_client_id}
            render={(renderProps) => (
                <a
                    href="//"
                    className="btn btn-google btn-block"
                    onClick={renderProps.onClick}
                >
                    <i className="fab fa-google mr-1"></i>{" "}
                    {register ? " Register" : " Login"}
                </a>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
        />
    );
};

export default GoogleButton;
