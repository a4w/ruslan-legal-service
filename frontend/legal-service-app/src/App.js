import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch, BrowserRouter, Redirect} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import LawyerList from "./LawyerList";
import AppointmentTimeForm from "./AppointmentTimeForm";
import Blogs from "./Blogs";
import ResetPassword from "./ResetPassword";
import EditPersonal from "./EditPersonal";
import Home from "./Home";
import LawyerCompleteRegisteration from "./LawyerCompleteRegisteration";
import LawyerDashboard from "./LawyerDashboard";
import LawyerProfile from "./LawyerProfile";
import ClientDashboard from "./ClientDashboard";
import ForgotPassword from "./ForgotPassword";
import ChatPage from "./ChatPage";
import LawyerBooking from "./LawyerBooking";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoComponent from "./VideoComponent";
import LawyerRating from "./LawyerRating";
import BlogPage from "./WriteBlog";
import ScheduleForm from "./ScheduleForm"
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import "./assets/css/datepicker.css";
import "./assets/css/style.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Cookies from "universal-cookie";
import LawyerAgenda from "./LawyerAgenda";
import BookLawyerModal from "./BookLawyerModal";
import BlogDetails from "./BlogDetails"
import ResponsiveChatPage from "./ResponsiveChatPage";
import RatingModal from "./RatingModal";
import NotFound from "./NotFound";
import Admin from "./Admin";

const cookie = new Cookies();


function App() {
    return (
        <>
            <ToastContainer />
            <Router history={history}>
                {/* <NavBar /> */}
                {/* <Route component={NavBar} />
                <Route path="(.+)/login" render={(props) => {
                    if (cookie.get('logged_in')) {
                        return <Redirect to={props.match.params[0]} />
                    } else {
                        return <LoginModal back={props.match.params[0]} />
                    }
                }} />
                <Route path="(.+)/register">
                    <RegisterModal />
                </Route> */}
                <Route path="(.+)/book-lawyer/:LawyerId" component={BookLawyerModal} />
                <Route path="(.+)/rate-lawyer" component={RatingModal} />
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
                    <Route path="/book">
                        <AppointmentTimeForm lawyer_id="1" />
                    </Route>
                    <Route path="/blogs">
                        <Switch>
                            <Route exact path="/blogs" >
                                <Blogs />
                            </Route>
                            <Route path="/blogs/:tag" component={Blogs} />
                        </Switch>
                    </Route>

                    <Route path="/blog/:blogId" component={BlogDetails} />
                    <Route
                        exact
                        path="/reset/:Token"
                        component={ResetPassword}
                    />
                    <Route exact path="/edit">
                        <EditPersonal />
                    </Route>
                    <Route path="/complete-registeration">
                        <LawyerCompleteRegisteration />
                    </Route>
                    <Route path="/dashboard">
                        <LawyerDashboard />
                    </Route>
                    <Route
                        path="/profile/:LawyerId"
                        component={LawyerProfile}
                    />
                    <Route path="/client-dashboard">
                        <ClientDashboard />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route path="/chat">
                        <ResponsiveChatPage />
                    </Route>
                    <Route exact path="/video/:AppointmentId" render={(props) => {
                        return <VideoComponent appointment_id={props.match.params.AppointmentId} />;
                    }}>
                    </Route>
                    <Route path="/rate">
                        <LawyerRating appointment_id={31} />
                    </Route>
                    <Route path="/write-blog">
                        <BlogPage />
                    </Route>
                    <Route exact path="/edit-schedule">
                        <ScheduleForm />
                    </Route>
                    <Route path="/logout">
                        <Redirect replace to="/" />
                    </Route>
                    <Route path="/calendar">
                        <LawyerAgenda />
                    </Route>
                    <Route path="/not-found">
                        <NotFound />
                    </Route>
                    <Route>
                        <Redirect replace to="/not-found"/>
                    </Route>
                </Switch>
                <Route component={Footer} />
                {/* <Footer /> */}
            </Router>
        </>
    );
}

export default App;
