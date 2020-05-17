import React from "react";
import "./App.css";
import RegisterationForm from "./RegisterationForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/plugins/fontawesome/css/all.css'
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
                <LoginForm />
                <Footer />
            </Route>
            <Route path='/Register'>
                <NavBar />
                <RegisterationForm />
                <Footer />
            </Route>
        </BrowserRouter>
    );
}

export default App;
