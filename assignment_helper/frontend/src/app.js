import React from "react";
import { Nav } from "./components/navbar";
import { Footer } from "./components/footer";
import Home from "./pages/home";
import Assignment from "./pages/assignments";
import Upload from "./pages/upload";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="assignment" element={<Assignment />} />
          <Route path="upload-assignment" element={<Upload />} />
          <Route path="login" element={<Login />} />
        </Routes>

        <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
