import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";

const PrivateRoutes = () => {
  const { auth, loading } = useContext(AuthContext);

  // 🟡 Wait until auth is restored from localStorage
  if (loading) return <Loader />;

  // 🔴 Not logged in
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return <Outlet />;
};

export default PrivateRoutes;
