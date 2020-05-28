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
import Home from "./Home";

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
            </Switch>
        </Router>
    );
}

export default App;
