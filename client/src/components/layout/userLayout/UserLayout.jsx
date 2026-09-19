import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserNavbar from "./UserNavbar";

const UserLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <UserMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <UserNavbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <div className="p-6 sm:p-8 max-w-6xl w-full mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;