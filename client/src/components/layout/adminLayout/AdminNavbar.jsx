import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import AuthContext from "../../../context/AuthContext";

const AdminNavbar = ({ setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const profile = {
    name: auth?.user?.name || "Admin",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Admin",
      )}&background=18181b&color=fff`,
    role: "Administrator",
  };

  const getCurrentPageTitle = () => {
    if (location.pathname.includes("/dashboard/admin/products"))
      return "Manage Products";
    if (location.pathname.includes("/dashboard/admin/collections"))
      return "Manage Collections";
    if (location.pathname.includes("/dashboard/admin/orders"))
      return "Manage Orders";
    if (location.pathname.includes("/dashboard/admin/users"))
      return "Manage Users";
    if (location.pathname.includes("/dashboard/admin/profile"))
      return "Profile & Settings";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 sticky top-0 z-10 px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-zinc-600 hover:text-zinc-900 md:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center space-x-2 text-sm">
          <span className="text-zinc-400 font-medium">Admin Panel</span>
          <ChevronRight size={14} className="text-zinc-300" />
          <span className="font-semibold text-zinc-900">
            {getCurrentPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          to="/dashboard/admin/profile"
          className="flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 group-hover:border-zinc-400 transition-colors">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-tight">
              {profile.name}
            </p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
              {profile.role}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminNavbar;