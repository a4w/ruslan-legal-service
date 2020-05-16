import React from "react";
import "./App.css";
import Register from "./Register";
import PreReleaseHome from "./PreReleaseHome";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

function App() {
    return (
        <BrowserRouter>
            <Route exact path='/'>
                <NavBar />
                <Home />
                <Footer />
            </Route>
            <Route path='/login'>
                <NavBar />
                <Login />
                <Footer />
            </Route>
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
