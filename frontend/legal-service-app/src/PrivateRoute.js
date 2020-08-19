import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./App";

function PrivateRoute({component, ...rest}) {
    const [auth,] = useContext(AuthContext);
    if (auth.isLoggedIn) {
        return <Route {...rest} component={component} />;
    } else {
        return <Route {...rest} render={() => (<Redirect to="/home/login" />)} />
    }
}

export default PrivateRoute;
