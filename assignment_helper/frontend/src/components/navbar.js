import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";

export const Nav = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  if (window.location.pathname === "/login") return null;

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header>
      <div className="nav-logo">
        <img src="static/images/logo.png" alt="" className="logo" />
      </div>
      <nav>
        <ul className="nav-items">
          <li
            className={splitLocation[1] === "" ? "active nav-link" : "nav-link"}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={
              splitLocation[1] === "assignment" ? "active nav-link" : "nav-link"
            }
          >
            <Link to="/assignment">Assignment</Link>
          </li>
          <li
            className={
              splitLocation[1] === "upload-assignment"
                ? "active nav-link"
                : "nav-link"
            }
          >
            <Link to="/upload-assignment">Contribute</Link>
          </li>
          <li
            className={
              splitLocation[1] === "login" ? "active nav-link" : "nav-link"
            }
          >
            {isAuthenticated ? (
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
