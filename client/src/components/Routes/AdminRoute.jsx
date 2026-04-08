import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Loader from "../Loader";

const AdminRoute = () => {
  const { auth, loading } = useContext(AuthContext);

  // 🟡 Wait until auth is restored from localStorage
  if (loading) return <Loader />;

  // 🔴 Not logged in
  if (!auth?.user) return <Navigate to="/login" replace />;

  // 🔴 Not admin
  if (auth.user.role !== "admin") return <Navigate to="/" replace />;

  // ✅ Allowed
  return <Outlet />;
};

export default AdminRoute;