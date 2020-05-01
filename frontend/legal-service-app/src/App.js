import React from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
    return (
        <>
            <NavBar />
            <BrowserRouter>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/Register'>
                    <Register />
                </Route>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;
