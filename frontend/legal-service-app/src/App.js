import React from "react";
import "./App.css";
import RegisterationForm from "./RegisterationForm";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css"
import "./assets/css/style.css";

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/'>
                    <h1> Yet to be done </h1>
                </Route>>
                <Route path='/login'>
                    <NavBar />
                    <LoginForm />
                    <Footer />
                </Route>
                <Route path='/register'>
                    <NavBar />
                    <RegisterationForm />
                    <Footer />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
