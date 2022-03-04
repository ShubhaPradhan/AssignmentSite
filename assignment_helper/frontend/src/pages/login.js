import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const {
    email,
    password,
    message,
    setEmail,
    setPassword,
    setIsAuthenticated,
    setIsError,
    setIsSuccess,
    issuccess,
    iserror,
    setMessage,
  } = useGlobalContext();

  let navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("/api/token/", requestOptions).then((response) => {
      if (response.ok) {
        setIsAuthenticated(true);
        navigate(`/upload-assignment`);
      } else {
        setIsAuthenticated(false);
        setMessage("Invalid email or password");
        setIsError(true);
      }
    });
  };

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
            <img src="static/images/login-3.gif"></img>
          </motion.div>

          <motion.div
            animate={formValue === "login" ? { x: 0 } : { x: "-100%" }}
            transition={{ duration: 2 }}
            className="login-form"
          >
            <form method="POST">
              {iserror ? <div className="messages">{message}</div> : null}
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleEmail}
                />
                <label htmlFor="Email" className="label">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={handlePassword}
                />
                <label htmlFor="password" className="label">
                  Password
                </label>
              </div>
              <div className="buttons">
                <button
                  style={{ display: formValue === "login" ? "block" : "none" }}
                  type="submit"
                  className="primary"
                  onClick={handleUserLogin}
                >
                  <div className="overlay"></div>
                  <span>Login</span>
                </button>
                <button
                  style={{ display: formValue === "signin" ? "block" : "none" }}
                  type="submit"
                  className="alternate"
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
