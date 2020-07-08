import React from "react";
import GoogleLogin from "react-google-login";
import Config from "./Config";
import {request, setAccessToken} from "./Axios"

const GoogleButton = ({register}) => {
    const responseGoogle = (response) => {
        console.log(response);
        const data = {
            id_token: response.tokenObj.id_token,
            name: response.profileObj.givenName,
            surname: response.profileObj.familyName,
            email: response.profileObj.email
        };
        request({
            url: 'auth/google-login',
            method: 'POST',
            data: data
        }).then(response => {
            console.log(response);
            setAccessToken(response.access_token);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
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
            isSignedIn={false}


        />
    );
};

export default GoogleButton;
