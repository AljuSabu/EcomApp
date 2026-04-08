import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Local Storage inside useStare()
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      return {
        user: parseData.user,
        token: parseData.token,
      };
    }
    return {
      user: null,
      token: "",
    };
  });

  //* BaseUrl
  // axios.defaults.baseURL = "http://localhost:4000"

  //* Local Storage using useEffect(()=>{},[])
  // useEffect(() => {
  //   const data = localStorage.getItem("auth");
  //   if (data) {
  //     const parseData = JSON.parse(data);
  //     setAuth({
  //       user: parseData.user,
  //       token: parseData.token,
  //     });
  //   }
  // }, []);

  // Axios header sync
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
