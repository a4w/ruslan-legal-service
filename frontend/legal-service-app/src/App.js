import React from "react";
import "./App.css";
import RegisterationForm from "./RegisterationForm";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/style.css";
import LawyerList from "./LawyerList";
import AppointmentTimeForm from "./AppointmentTimeForm"

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <h1> Yet to be done </h1>
                </Route>
                >
                <Route exact path="/login">
                    <NavBar />
                    <LoginForm />
                    <Footer />
                </Route>
                <Route exact path="/register">
                    <NavBar />
                    <RegisterationForm />
                    <Footer />
                </Route>
                <Route exact path="/list">
                    <LawyerList />
                </Route>
                <Route exact path="/book">
                    <AppointmentTimeForm lawyer_id="1" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
