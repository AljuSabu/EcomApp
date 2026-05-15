import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const UserLayout = () => {
  return (
    <>
      <div className="min-h-screen w-full flex">
        <UserMenu />
        <main className="grow p-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
