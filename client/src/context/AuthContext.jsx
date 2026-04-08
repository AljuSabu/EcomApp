import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [loading, setLoading] = useState(true);

  //* BaseUrl
  // axios.defaults.baseURL = "http://localhost:4000"

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${parseData.token}`
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
