import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };
  const logout = async (inputs) => {try{
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
  }catch (error) {
    console.error("Logout error:", error);
    // Handle the error, if needed
  }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
