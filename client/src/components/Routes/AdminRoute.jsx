import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";
import AuthContext from "../../context/AuthContext";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/auth/admin-auth",
        );
        setOk(data.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };
    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) return <Loader />;

  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
