import React from "react";
import EditPassword from "./EditPassword";
import ClientDashboardStatus from "./ClientDashboardStatus";
import ProfileSettings from "./ProfileSettings";
import { Switch, Route, Redirect } from "react-router-dom";

const ClientDashboardTabs = () => {
    return (
        <Switch>
            <Route exact path="/client-dashboard">
                <Redirect replace to="/client-dashboard/status" />
            </Route>
            <Route path="/client-dashboard/status">
                <ClientDashboardStatus />
            </Route>
            <Route path="/client-dashboard/messages">test</Route>
            <Route path="/client-dashboard/settings">
                <ProfileSettings />
            </Route>
            <Route path="/client-dashboard/change-password">
                <EditPassword />
            </Route>
            <Route path="/client-dashboard/logout">test</Route>
        </Switch>
    );
};
export default ClientDashboardTabs;
