import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
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

function App() {
    return (
        <BrowserRouter>
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
                    <Route exact path="/blogs">
                        <Blogs />
                    </Route>
                    <Route exact path="/reset">
                        <ResetPassword />
                    </Route>
                    <Route exact path="/edit">
                        <EditPersonal />
                    </Route>
                    <Route exact path="/complete-registeration">
                        <LawyerCompleteRegisteration />
                    </Route>
                    <Route exact path="/dashboard">
                        <LawyerDashboard />
                    </Route>
                    <Route exact path="/profile">
                        <LawyerProfile />
                    </Route>
                    <Route exact path="/client-dashboard">
                        <ClientDashboard />
                    </Route>
                    <Route exact path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </BrowserRouter>
    );
}

export default App;
