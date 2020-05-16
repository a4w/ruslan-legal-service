import React from "react";
import "./App.css";
import PreReleaseHome from "./PreReleaseHome";
import PreNavBar from "./PreNavBar";
import PreFooter from "./PreFooter";
import PostRegistration from "./PostRegistration";
import PostVerification from "./PostVerification";
import {Route, Router, Redirect, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/plugins/fontawesome/css/all.css'
import history from "./history";

function App() {
    return (
        <Router history={history}>
            <PreNavBar />
            <Switch>
                <Route exact path='/'>
                    <PreReleaseHome />
                </Route>
                <Route exact path='/post-registration'>
                    <PostRegistration />
                </Route>
                <Route exact path='/post-verification'>
                    <PostVerification />
                </Route>
                <Redirect to='/' />
            </Switch>>
            <PreFooter />
        </Router>
    );
}

export default App;
