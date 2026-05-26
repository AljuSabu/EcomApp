import React from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const AdminLayout = () => {
  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <AdminMenu />
        <main className="flex-1 overflow-y-auto p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
