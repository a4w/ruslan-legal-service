import React from "react";
import Tab from "react-bootstrap/Tab";
import EditPassword from "./EditPassword";
import EditPersonal from "./EditPersonal";
import LawyerAppointments from "./LawyerAppointments";
import LawyerInvoice from "./LawyerInvoice";
import LawyerClients from "./LawyerClients";
import LawyerDashboardStatus from "./LawyerDashboardStatus";
import LawyerReviews from "./LawyerReviews";
import { Route, Switch, Redirect } from "react-router-dom";
import History from "./History";

const LawyerDashboardTabs = () => {
    return (
        <Switch>
            <Route exact path="/dashboard">
                <Redirect replace to="/dashboard/status" />
            </Route>
            <Route exact path="/dashboard/status">
                <LawyerDashboardStatus />
            </Route>
            <Route exact path="/dashboard/appointments">
                <LawyerAppointments />
            </Route>
            <Route exact path="/dashboard/clients">
                <LawyerClients />
            </Route>
            <Route exact path="/dashboard/schedule">
                test 4
            </Route>
            <Route exact path="/dashboard/invoices">
                test 5
            </Route>
            <Route exact path="/dashboard/reviews">
                <LawyerReviews />
            </Route>
            <Route exact path="/dashboard/messages">
                test 7
            </Route>
            <Route exact path="/dashboard/settings">
                <EditPersonal />
            </Route>
            <Route exact path="/dashboard/change-password">
                <EditPassword />
            </Route>
            <Route exact path="/dashboard/logout">
                test 11
            </Route>
        </Switch>
    );
};
export default LawyerDashboardTabs;
