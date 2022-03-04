import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const {
    registeremail,
    setRegisterEmail,
    registerpassword,
    setRegisterPassword,
    registerFullName,
    setRegisterFullName,
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

  const handleUserRegistration = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        full_name: full_name,
      }),
    };
    fetch("/api/users/", requestOptions).then((response) => {
      if (response.ok) {
        setMessage("Account created successfully");
        setIsSuccess(true);
      } else {
        setMessage("Invalid email or password");
        setIsError(true);
      }
    });
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

  const [formValue, setFormValue] = useState("login");

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
            <form
              method="POST"
              onSubmit={
                formValue === "login" ? handleUserLogin : handleUserRegistration
              }
            >
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
                  setFormValue("signup");
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
