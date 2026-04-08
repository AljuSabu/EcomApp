import React from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const AdminLayout = () => {
  return (
    <>
      <div className="min-h-screen flex gap-5">
        <AdminMenu />
        <main className="grow pt-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
