import React from "react";
import FacebookLogin from 'react-facebook-login';
import env from "./env";

const FacebookButton = ({register}) => {
    const ResponseCallback = (response) => {
        console.log(response);
    };
    return (
        <FacebookLogin
            appId={env.facebook_app_id}
            cssClass="btn btn-facebook btn-block"
            icon="fab fa-facebook-f mr-1"
            textButton={register ? " Register" : " Login"}
            fields="name,email,picture"
            callback={ResponseCallback}
        />
    );
}

export default FacebookButton;
