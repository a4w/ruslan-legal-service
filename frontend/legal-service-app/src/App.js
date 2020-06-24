import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch, BrowserRouter} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/style.css";
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
import EditLawyerSchedule from "./EditLawyerSchedule"

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
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
                        <EditLawyerSchedule />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </BrowserRouter>
    );
}

export default App;
