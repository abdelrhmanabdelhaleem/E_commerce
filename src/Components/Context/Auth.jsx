import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

export let AuthContext = createContext("");
export default function AuthContextProvider(props) {
  const [user, setuser] = useState(null);

  let saveUserData = () => {
    let enCodeToken = localStorage.getItem("token");
    let deCodeToken = jwtDecode(enCodeToken);
    setuser(deCodeToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  let logOut = () => {
    localStorage.removeItem("token");
    setuser(null);

    return <Navigate to="login" />;
  };

  return (
    <AuthContext.Provider value={{ user, logOut, saveUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
