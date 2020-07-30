import React from "react";
import Tab from "react-bootstrap/Tab";
import EditPassword from "./EditPassword";
import EditPersonal from "./EditPersonal";
import LawyerAppointments from "./LawyerAppointments";
import LawyerInvoice from "./LawyerInvoice";
import LawyerClients from "./LawyerClients";
import LawyerDashboardStatus from "./LawyerDashboardStatus";
import LawyerReviews from "./LawyerReviews";
import {Route, Switch, Redirect} from "react-router-dom";
import ScheduleForm from "./ScheduleForm";
import UserCalendar from "./UserCalendar";
import LawyerBlogs from "./LawyerBlogs";
import ResponsiveChatPage from "./ResponsiveChatPage";

const LawyerDashboardTabs = () => {
    return (
        <Switch>
            <Route exact path="/dashboard">
                <Redirect replace to="/dashboard/status" />
            </Route>
            <Route path="/dashboard/status">
                <LawyerDashboardStatus />
            </Route>
            <Route exact path="/dashboard/appointments">
                <LawyerAppointments />
            </Route>
            <Route exact path="/dashboard/schedule">
                <ScheduleForm />
            </Route>
            <Route path="/dashboard/calendar">
                <UserCalendar />
            </Route>
            <Route exact path="/dashboard/reviews">
                <LawyerReviews />
            </Route>
            <Route path="/dashboard/blogs">
                <LawyerBlogs />
            </Route>
            <Route
                path="/dashboard/chat"
                render={(props) => (
                    <ResponsiveChatPage
                        {...props}
                        url="/dashboard/chat"
                        minHeight="500px"
                    />
                )}
            />
            <Route path="/dashboard/settings">
                <EditPersonal />
            </Route>
            <Route exact path="/dashboard/change-password">
                <EditPassword />
            </Route>
            <Route exact path="/dashboard/logout">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};
export default LawyerDashboardTabs;
