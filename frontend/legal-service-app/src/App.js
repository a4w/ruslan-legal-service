import React from "react";
import "./App.css";
import Register from "./Register";
import PreReleaseHome from "./PreReleaseHome";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Route path='/Register'>
                <NavBar />
                <Register />
                <Footer />
            </Route>
            <Route path='/home'>
                <PreReleaseHome />
            </Route>
        </BrowserRouter>
    );
}

export default App;
