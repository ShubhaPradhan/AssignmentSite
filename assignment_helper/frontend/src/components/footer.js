import React from "react";

export const Footer = () => {
  if (window.location.pathname === "/login") return null;

  return (
    <footer className="footer">
      <p>Assignment © 2022</p>
    </footer>
  );
};
