import React from "react";
import { useLocation } from "react-router-dom";
export const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  if (window.location.pathname === "/login") return null;

  return (
    <footer className="footer">
      <p>Assignment © 2022</p>
    </footer>
  );
};
