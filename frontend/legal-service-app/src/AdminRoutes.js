import React from "react";
import { Route } from "react-router-dom";
import "./assets/css/AdminApp.css";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";

const AdminRoutes = () => {
    return (
        <>
            <Route path="/admin/admin-login">
                <AdminLogin />
            </Route>
            <PrivateRoute path="/admin" admin={true}>
                <Admin />
            </PrivateRoute>
        </>
    );
};
export default AdminRoutes;
