import React from "react";
import "./App.css";
import Register from "./Register";
import NavBar from "./NavBar";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Register />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
