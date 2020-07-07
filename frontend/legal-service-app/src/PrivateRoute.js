import React from "react"
import Cookies from "universal-cookie";
import {Route, Redirect} from "react-router-dom";

const cookie = new Cookies();

function PrivateRoute({component, ...rest}) {
    if (cookie.get("logged_in")) {
        return <Route {...rest} component={component} />;
    } else {
        return <Route {...rest} render={() => (<Redirect to="/home/login" />)} />
    }
}

export default PrivateRoute;
