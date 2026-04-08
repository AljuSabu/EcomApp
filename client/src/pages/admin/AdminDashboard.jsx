import React from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../components/layout/adminLayout/AdminMenu";

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
    </>
  );
};

export default AdminDashboard;
