import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./App";

function PrivateRoute({component, admin, ...rest}) {
    const [auth] = useContext(AuthContext);
    console.log("Admin auth", auth);
    if (admin) {
        if (auth.isLoggedIn && auth.accountType === "ADMIN") {
            return <Route {...rest} component={component} />;
        } else {
            return <Redirect to="/admin/login" />;
        }
    } else {
        if (auth.isLoggedIn) {
            return <Route {...rest} component={component} />;
        } else {
            return (
                <Route {...rest} render={() => <Redirect to="/home/login" />} />
            );
        }
    }
}

export default PrivateRoute;
