import React from "react";
import EditPassword from "./EditPassword";
import ClientDashboardStatus from "./ClientDashboardStatus";
import ProfileSettings from "./ProfileSettings";
import { Switch, Route, Redirect } from "react-router-dom";
import UserCalendar from "./UserCalendar";
import ResponsiveChatPage from "./ResponsiveChatPage";

const ClientDashboardTabs = () => {
    return (
        <Switch>
            <Route exact path="/client-dashboard">
                <Redirect replace to="/client-dashboard/status" />
            </Route>
            <Route path="/client-dashboard/status">
                <ClientDashboardStatus />
            </Route>
            <Route path="/client-dashboard/calendar">
                <UserCalendar />
            </Route>
            <Route
                path="/client-dashboard/chat"
                render={(props) => (
                    <ResponsiveChatPage
                        {...props}
                        url="/client-dashboard/chat"
                    />
                )}
            />
            <Route path="/client-dashboard/settings">
                <ProfileSettings />
            </Route>
            <Route path="/client-dashboard/change-password">
                <EditPassword />
            </Route>
            <Route path="/client-dashboard/logout">
                <Redirect replace to="/" />
            </Route>
        </Switch>
    );
};
export default ClientDashboardTabs;
