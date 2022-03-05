import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [iserror, setIsError] = useState(false);
  const [issuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : null
  );
  const [isloading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUserRegistration = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        full_name: fullName,
      }),
    };
    fetch("/api/users/", requestOptions).then((response) => {
      if (response.ok) {
        setMessage("Account created successfully");
        setIsSuccess(true);
      } else {
        if (response.statusText === "Conflict") {
          setMessage("Account already exists");
          setIsError(true);
        } else {
          setMessage("Invalid email or password");
          setIsError(true);
        }
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
    fetch("/api/token/", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessage("Invalid email or password");
          setIsError(true);
        }
      })
      .then((data) => {
        setToken(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("token", JSON.stringify(data));
        navigate(`/upload-assignment`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const updateToken = (e) => {
    console.log("Updating...");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: token.refresh,
      }),
    };
    fetch("/api/token/refresh/", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          handleLogout();
        }
      })
      .then((data) => {
        setToken(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("token", JSON.stringify(data));
      });
  };

  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fourMinutes);
    return () => {
      clearInterval(interval);
    };
  }, [token, isloading]);

  return (
    <AppContext.Provider
      value={{
        handleUserLogin,
        handleUserRegistration,
        handleLogout,
        handleFullName,
        handleEmail,
        handlePassword,
        message,
        token,
        issuccess,
        iserror,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
