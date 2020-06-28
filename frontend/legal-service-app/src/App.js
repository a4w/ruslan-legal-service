import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch, BrowserRouter, Redirect} from "react-router-dom";
import history from "./History";
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
import LawyerRating from "./LawyerRating";
import ScheduleForm from "./ScheduleForm"
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "./assets/css/style.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/home">
                        <Route path="/home/login" component={LoginModal} />
                        <Route path="/home/register" component={RegisterModal} />
                        <Home />
                    </Route>
                    <Route exact path="/list">
                        <LawyerList />
                    </Route>
                    <Route exact path="/book">
                        <AppointmentTimeForm lawyer_id="1" />
                    </Route>
                    <Route path="/blogs">
                        <Blogs />
                    </Route>
                    <Route exact path="/reset/:Token" component={ResetPassword} />
                    <Route exact path="/edit">
                        <EditPersonal />
                    </Route>
                    <Route exact path="/complete-registeration">
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
                    <Route exact path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route exact path="/chat">
                        <ChatPage />
                    </Route>
                    <Route path="/book-lawyer/:LawyerId">
                        <LawyerBooking />
                    </Route>
                    <Route exact path="/rate">
                        <LawyerRating appointment_id={31} />
                    </Route>

                    <Route exact path="/edit-schedule">
                        <ScheduleForm />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </BrowserRouter>
    );
}

export default App;
