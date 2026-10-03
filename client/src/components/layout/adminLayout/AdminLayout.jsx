import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [isMObileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminMenu
        isMObileMenuOpen={isMObileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <AdminNavbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <div className="p-6 sm:p-8 max-w-6xl w-full mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
