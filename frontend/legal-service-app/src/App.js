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
            <BrowserRouter>
                <NavBar />
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/Register'>
                    <Register />
                </Route>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
