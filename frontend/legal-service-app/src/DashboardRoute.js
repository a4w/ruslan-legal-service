import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./App";

const DashboardRoute = ({ component, ...rest }) => {
    const [auth] = useContext(AuthContext);
    if (auth.accountType === "CLIENT") {
        return <Route {...rest} path="/client-dashboard/chat" component={component} />;
    } else if (auth.accountType === "LAWYER") {
        return <Route {...rest} path="/dashboard/chat" component={component} />;
    } else {
        <Route />;
    }
};

export default DashboardRoute;
