import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Router, Switch } from "react-router-dom";
import history from "./History";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/style.css";
import LawyerList from "./LawyerList";
import Blogs from "./Blogs";
import ResetPassword from "./ResetPassword";
import EditPersonal from "./EditPersonal";
import Home from "./Home";
import LawyerCompleteRegisteration from "./LawyerCompleteRegisteration";

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <NavBar />
                    <Home />
                    <Footer />
                </Route>
                <Route exact path="/list">
                    <LawyerList />
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
            </Switch>
        </Router>
    );
}

export default App;
