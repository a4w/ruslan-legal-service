import React, {useContext} from "react";
import GoogleLogin from "react-google-login";
import env from "./env";
import useRequests from "./useRequests";
import {AuthContext} from "./App";

const GoogleButton = ({register}) => {
    const {request} = useRequests();
    const [auth, setAuth] = useContext(AuthContext);
    const responseGoogle = (response) => {
        if (typeof response.tokenObj !== "undefined") {
            return;
        }
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
            setAuth({
                accessToken: response.access_token,
                accountType: response.account_type,
                isLoggedIn: true,
                accountId: response.account.account.id,
            });
        }).catch(error => {
            console.log(error);
        });
    };
    return (
        <GoogleLogin
            clientId={env.google_client_id}
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
