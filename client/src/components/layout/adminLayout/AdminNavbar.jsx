import { useContext } from "react";
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
    <header className="h-16 bg-white border-b border-zinc-200 sticky top-0 z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* min-w-0 lets the page title shrink and truncate instead of pushing the avatar off-screen */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-zinc-600 hover:text-zinc-900 md:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-sm min-w-0">
          {/* "Admin Panel ›" is hidden on phones to leave room for the page title */}
          <span className="hidden sm:inline text-zinc-400 font-medium whitespace-nowrap">
            Admin Panel
          </span>
          <ChevronRight size={14} className="hidden sm:block text-zinc-300" />
          <span className="font-semibold text-zinc-900 truncate">
            {getCurrentPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
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