import React from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/css/AdminApp.css";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";

const AdminRoutes = () => {
    return (
        <Switch>
            <Route exact path="/admin/login">
                <AdminLogin />
            </Route>
            <PrivateRoute path="/admin" admin={true}>
                <Admin />
            </PrivateRoute>
        </Switch>
    );
};
export default AdminRoutes;
