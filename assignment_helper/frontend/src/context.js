import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
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
  const [iserror, setIsError] = useState(false);
  const [issuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [assignmentFile, setAssignmentFile] = useState("");
  const [assignmentSubject, setAssignmentSubject] = useState("");
  const [assignmentdescription, setAssignmentDescription] = useState("");

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

  const createAssignment = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log()
    const data = {
      user : user.user_id,
      username : user.full_name,
      title : assignmentTitle,
      subject : assignmentSubject,
      assignment_type : assignmentType,
      assignment_file : assignmentFile[0].name + " " + "(" + assignmentFile[0].type + ")",
      description : assignmentdescription,
    }
    formData.append("data", JSON.stringify(data));
    console.log(formData.get("data"));
    const requestOptions = {
      mode: 'no-cors',
      method: "POST",
      body: formData,
    };
    fetch("/api/create-assignments/", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessage("All fields are required");
          setIsError(true);
        }
      })
      .then((data) => {
        setMessage("Assignment created successfully");
        setIsSuccess(true);
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
        token,
        user,
        issuccess,
        iserror,
        message,
        isloading,
        assignmentTitle,
        assignmentType,
        assignmentFile,
        assignmentSubject,
        assignmentdescription,
        setAssignmentTitle,
        setAssignmentType,
        setAssignmentFile,
        setAssignmentSubject,
        setAssignmentDescription,
        createAssignment,
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
