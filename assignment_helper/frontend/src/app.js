import React from "react";
import { Nav } from "./components/navbar";
import { Footer } from "./components/footer";
import Home from "./pages/home";
import Assignment from "./pages/assignments";
import Upload from "./pages/upload";
import Login from "./pages/login";
import { AppProvider } from "./context";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <Nav></Nav>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/assignment" element={<Assignment />}></Route>
            <Route path="/upload-assignment" element={<Upload />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/update-assignment/:id" element={<Upload />}></Route>
          </Routes>

          <Footer></Footer>
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
