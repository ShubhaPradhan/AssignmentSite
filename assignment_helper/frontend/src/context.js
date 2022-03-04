import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeremail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [issuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);

  return (
    <AppContext.Provider
      value={{
        registeremail,
        setRegisterEmail,
        registerpassword,
        setRegisterPassword,
        registerFullName,
        setRegisterFullName,
        email,
        password,
        setEmail,
        setPassword,
        isAuthenticated,
        setIsAuthenticated,
        issuccess,
        setIsSuccess,
        iserror,
        setIsError,
        message,
        setMessage,
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
