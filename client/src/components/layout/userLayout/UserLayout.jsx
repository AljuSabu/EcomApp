import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const UserLayout = () => {
  return (
    <>
      <div className="min-h-screen flex gap-5">
        <UserMenu />
        <main className="grow p-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
