import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context";
import Alert from "../components/alert";

const Login = () => {
  const {
    handleUserLogin,
    handleUserRegistration,
    handleFullName,
    handleEmail,
    handlePassword,
    alert,
    setAlert,
    showAlert,
    assignment,
  } = useGlobalContext();

  const [formValue, setFormValue] = useState("signin");

  return (
    <>
      <section className="login">
        <div className="login-container">
          <motion.div
            animate={formValue === "register" ? { x: 0 } : { x: "100%" }}
            transition={{ duration: 0.5 }}
            className="login-image"
          >
            <img src="static/images/login-3.gif"></img>
          </motion.div>

          <motion.div
            animate={formValue === "register" ? { x: 0 } : { x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="login-form"
          >
            <form
              method="POST"
              onSubmit={
                formValue === "register"
                  ? handleUserRegistration
                  : handleUserLogin
              }
            >
              { alert.show && <Alert {...alert} removeAlert={showAlert} list={assignment} /> }
              <h3
                className="form-title"
                style={{ display: formValue === "register" ? "block" : "none" }}
              >
                Register !
              </h3>
              <h3
                className="form-title"
                style={{ display: formValue === "signin" ? "block" : "none" }}
              >
                Sign In !
              </h3>
              {formValue === "register" ? (
                <div className="input-field">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    onChange={handleFullName}
                  />
                  <label htmlFor="full_name" className="label">
                    Full Name
                  </label>
                </div>
              ) : null}
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
                  style={{
                    display: formValue === "register" ? "block" : "none",
                  }}
                  type="submit"
                  className="primary"
                >
                  <div className="overlay"></div>
                  <span>Register</span>
                </button>
                <button
                  style={{
                    display: formValue === "signin" ? "block" : "none",
                  }}
                  type="submit"
                  className="alternate"
                >
                  <div className="overlay"></div>
                  <span>Login</span>
                </button>
              </div>
              <p
                style={{ display: formValue === "signin" ? "block" : "none" }}
                className="bottom-text"
                onClick={() => {
                  setFormValue("register");
                }}
              >
                Not registered yet? <span>Sign Up!</span>
              </p>
              <p
                style={{ display: formValue === "register" ? "block" : "none" }}
                className="bottom-text"
                onClick={() => {
                  setFormValue("signin");
                }}
              >
                Already have an account? <span>Sign In!</span>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Login;
