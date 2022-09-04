import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";
import Details from "./components/Details";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/view/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
