import React from "react";
import { Nav } from "./components/navbar";
import { Footer } from "./components/footer";
import Home from "./pages/home";
import Assignment from "./pages/assignments";
import Upload from "./pages/upload";
import Login from "./pages/login";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { useGlobalContext } from "../context";

const App = () => {
  return (
    <>
      <Router>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/assignment" element={<Assignment />}></Route>
          <Route path="/upload-assignment" element={<Upload />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>

        <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
