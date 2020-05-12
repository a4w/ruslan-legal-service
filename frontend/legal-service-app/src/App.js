import React from "react";
import "./App.css";
import Register from "./Register";
import PreReleaseHome from "./PreReleaseHome";
import PreNavBar from "./PreNavBar";
import PreFooter from "./PreFooter";
import PostRegistration from "./PostRegisration";
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/plugins/fontawesome/css/all.css'

function App() {
    return (
        <BrowserRouter>
            <PreNavBar />
            <Switch>
                <Route exact path='/'>
                    <PreReleaseHome />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/post-registration'>
                    <PostRegistration />
                </Route>
                <Redirect to='/' />
            </Switch>>
            <PreFooter />
        </BrowserRouter>
    );
}

export default App;
