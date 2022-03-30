import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

const axios = require('axios').default;
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
  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);  
  const [isAssignmentChanged, setIsAssignmentChanged] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

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
        console.log("login here");
        navigate(`/upload-assignment`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const updateToken = (e) => {
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
    setIsAssignmentChanged(false);
    const uploadData = new FormData();
    uploadData.append('user', user.user_id);
    uploadData.append('username', user.full_name);
    uploadData.append('title', assignmentTitle);
    uploadData.append('subject', assignmentSubject);
    uploadData.append('assignment_type', assignmentType);
    uploadData.append('assignment_file', assignmentFile[0]);
    uploadData.append('description', assignmentdescription);
    axios.post("/api/create-assignments/", uploadData)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessage("All fields are required");
          setIsError(true);
        }
      })
    .then((data) => {
      setIsAssignmentChanged(true);
      setMessage("Assignment created successfully");
      setIsSuccess(true);
      navigate(`/assignment`);
    });
  };

  const getAssignments = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/assignments/", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setAssignment(data);
      });
  };

  const getAssignmentData = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/assignment/${parseInt(splitLocation[2])}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setId(data.id);
        setAssignmentTitle(data.title);
        setAssignmentType(data.assignment_type);
        setAssignmentSubject(data.subject);
        setAssignmentFile("");
        setAssignmentDescription(data.description);
        setIsUpdate(true);
      });
  }
  
  const updateAssignment = (e) => {
    e.preventDefault();
    setIsAssignmentChanged(false);
    const uploadData = new FormData();
    uploadData.append('user', user.user_id);
    uploadData.append('username', user.full_name);
    uploadData.append('title', assignmentTitle);
    uploadData.append('subject', assignmentSubject);
    uploadData.append('assignment_type', assignmentType);
    uploadData.append('assignment_file', assignmentFile[0]);
    uploadData.append('description', assignmentdescription);
    axios.put(`/api/update-assignment/${parseInt(id)}/`, uploadData)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessage("All fields are required");
          setIsError(true);
        }
      }
    )
    .then((data) => {
      setIsAssignmentChanged(true);
      setMessage("Assignment updated successfully");
      setIsSuccess(true);
      navigate(`/assignment`);
    }
    );
  };

  // THIS IS FOR CLEARING THE FORM FIELDS WHILE CHANGING FROM UPDATE TO POST PAGE
  const handleFormClear = () => {
    setIsUpdate(false);
    setAssignmentTitle("");
    setAssignmentType("");
    setAssignmentSubject("");
    setAssignmentFile("");
    setAssignmentDescription("");
  };


  const deleteAssignment = (e) => {
    e.preventDefault();
    setIsAssignmentChanged(false);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/delete-assignment/${parseInt(splitLocation[2])}/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setIsAssignmentChanged(true);
          setMessage("Assignment deleted successfully");
          setIsSuccess(true);
          navigate(`/assignment`);
          return response.json();
        }
      })
    };


  useEffect(() => {
    getAssignments();
  }, [isAssignmentChanged]);

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
        assignment,
        updateAssignment,
        getAssignmentData,
        isUpdate, 
        setIsUpdate,
        handleFormClear,
        deleteAssignment,
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
