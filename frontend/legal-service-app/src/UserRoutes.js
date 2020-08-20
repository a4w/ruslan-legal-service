import React, { useContext } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch, Redirect} from "react-router-dom";
import history from "./History";
import LawyerList from "./LawyerList";
import Blogs from "./Blogs";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import LawyerDashboard from "./LawyerDashboard";
import LawyerProfile from "./LawyerProfile";
import ClientDashboard from "./ClientDashboard";
import ForgotPassword from "./ForgotPassword";
import VideoComponent from "./VideoComponent";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UserCalendar from "./UserCalendar";
import BookLawyerModal from "./BookLawyerModal";
import RatingModal from "./RatingModal";
import NotFound from "./NotFound";
import AppointmentDetails from "./AppointmentDetails";
import PrivateRoute from "./PrivateRoute";
import PostRegistration from "./PostRegistration"
import { AuthContext } from "./App";

const UserRoutes = () => {
    const [auth] = useContext(AuthContext);
    return (
        <>
            {/* <NavBar /> */}
            <Route component={NavBar} />
            <Route
                path="(.+)/login"
                render={(props) => {
                    if (auth.isLoggedIn) {
                        return <Redirect to={props.match.params[0]} />;
                    } else {
                        return <LoginModal back={props.match.params[0]} />;
                    }
                }}
            />
            <Route
                path="(.+)/register"
                render={(props) => {
                    if (auth.isLoggedIn) {
                        return <Redirect to={props.match.params[0]} />;
                    } else {
                        return <RegisterModal back={props.match.params[0]} />;
                    }
                }}
            />
            <Route
                path="(.+)/book-lawyer/:LawyerId"
                component={BookLawyerModal}
            />
            <Route
                path="(.+)/rate-lawyer/:appId/:lawyerId"
                component={RatingModal}
            />
            <Route path="(.+)/details/:appId" component={AppointmentDetails} />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/list">
                    <LawyerList />
                </Route>
                <Route path="/blogs">
                    <Route path="/blogs" component={Blogs} />
                </Route>
                {/* <Route path="/blog/:blogId" component={BlogDetails} /> */}
                <Route exact path="/reset/:Token" component={ResetPassword} />
                <PrivateRoute path="/dashboard" component={LawyerDashboard} />
                <Route
                    path="/profile/:LawyerId/:LawyerName"
                    component={LawyerProfile}
                />
                <PrivateRoute
                    path="/client-dashboard"
                    component={ClientDashboard}
                />
                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route
                    path="/video/:AppointmentId"
                    render={(props) => {
                        return (
                            <VideoComponent
                                appointment_id={
                                    props.match.params.AppointmentId
                                }
                            />
                        );
                    }}
                ></Route>
                <Route path="/logout">
                    <Redirect replace to="/" />
                </Route>
                <Route path="/calendar">
                    <UserCalendar />
                </Route>
                <Route path="/post-register" component={PostRegistration} />
                <Route path="/not-found" status={404}>
                    <NotFound />
                </Route>
                <Route>
                    <Redirect replace to="/not-found" />
                </Route>
            </Switch>
            <Route component={Footer} />
            {/* <Footer /> */}
        </>
    );
};

export default UserRoutes;
