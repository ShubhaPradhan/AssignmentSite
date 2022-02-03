import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [formValue, setFormValue] = useState("signin");
  return (
    <>
      <section className="login">
        <div className="login-container">
          <motion.div
            animate={formValue === "login" ? { x: 0 } : { x: "100%" }}
            transition={{ duration: 2 }}
            className="login-image"
          >
            <img src="/images/login-3.gif"></img>
          </motion.div>

          <motion.div
            animate={formValue === "login" ? { x: 0 } : { x: "-100%" }}
            transition={{ duration: 2 }}
            className="login-form"
          >
            <form action="">
              <h3
                className="form-title"
                style={{ display: formValue === "login" ? "block" : "none" }}
              >
                Login !
              </h3>
              <h3
                className="form-title"
                style={{ display: formValue === "signin" ? "block" : "none" }}
              >
                Sign Up !
              </h3>
              <div className="input-field">
                <input type="email" id="email" required />
                <label htmlFor="Email" className="label">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input type="password" id="password" required />
                <label htmlFor="password" className="label">
                  Password
                </label>
              </div>
              <div className="buttons">
                <button
                  style={{ display: formValue === "login" ? "block" : "none" }}
                  type="submit"
                  className="primary"
                  onClick={() => {
                    setFormValue("login");
                  }}
                >
                  <div className="overlay"></div>
                  <span>Login</span>
                </button>
                <button
                  style={{ display: formValue === "signin" ? "block" : "none" }}
                  type="submit"
                  className="alternate"
                  onClick={() => {
                    setFormValue("signin");
                  }}
                >
                  <div className="overlay"></div>
                  <span>Sign Up</span>
                </button>
              </div>
              <p
                style={{ display: formValue === "signin" ? "block" : "none" }}
                className="bottom-text"
                onClick={() => {
                  setFormValue("login");
                }}
              >
                Already have an account? <span>Sign In!</span>
              </p>
              <p
                style={{ display: formValue === "login" ? "block" : "none" }}
                className="bottom-text"
                onClick={() => {
                  setFormValue("signin");
                }}
              >
                Not registered yet? <span>Sign Up!</span>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Login;
