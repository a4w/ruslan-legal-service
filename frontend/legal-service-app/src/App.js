import React from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import NavBar from "./NavBar";
import Footer from "./Footer";

function App() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <Login />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
