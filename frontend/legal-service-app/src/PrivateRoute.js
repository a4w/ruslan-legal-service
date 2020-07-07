import React from "react"
import Cookies from "universal-cookie";
import {Route, Redirect} from "react-router-dom";

const cookie = new Cookies();

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => cookie.get("logged_in")
                ? <Component {...props} />
                : <Redirect to={{pathname: 'home/login', state: {from: props.location}}} />}
        />
    )
}

export default PrivateRoute;
