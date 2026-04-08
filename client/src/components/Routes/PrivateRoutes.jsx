import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";

const PrivateRoutes = () => {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/auth/user-auth",
        );
        setOk(data.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    console.log("TOKEN:", auth.token);
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader />;
};

export default PrivateRoutes;
