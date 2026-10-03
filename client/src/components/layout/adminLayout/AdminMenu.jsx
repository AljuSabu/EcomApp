import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronRight,
  DoorOpen,
  Layers,
  LayoutDashboard,
  // Settings,
  ShoppingBag,
  Store,
  X,
  Sparkles,
  User,
} from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "", end: true, icon: LayoutDashboard },
  { name: "Profile", path: "profile", icon: User },
  { name: "Manage Collection", path: "manage-collection", icon: Layers },
  { name: "Manage Product", path: "manage-product", icon: ShoppingBag },
  { name: "Product Catalog", path: "products", icon: Store },
];

const NavItems = ({ onItemClick }) => (
  <nav className="space-y-2">
    {menuItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.path || "."}
        end={item.end}
        onClick={onItemClick}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
            isActive
              ? "bg-zinc-900 text-white shadow-md"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          }`
        }
      >
        <div className="flex items-center space-x-3">
          <item.icon size={18} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        <ChevronRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </NavLink>
    ))}
  </nav>
);

const AdminMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { auth, setAuth } = useContext(AuthContext);

  const profile = {
    name: auth?.user?.name || "Admin",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Admin",
      )}&background=18181b&color=fff`,
    role: auth?.user?.role || "Administrator",
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 fixed h-screen overflow-y-auto hidden md:flex flex-col justify-between z-20">
        <div>
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tighter"
            >
              LUXE<span className="text-zinc-400">.</span>
            </Link>
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
              <Sparkles size={10} className="mr-1" />
              Admin
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6 p-3 bg-zinc-50 rounded-xl">
              <div className="size-10 rounded-full flex justify-center items-center bg-zinc-900 text-white font-semibold overflow-hidden shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {profile.name}
                </p>
                <p className="text-xs text-zinc-500">{profile.role}</p>
              </div>
            </div>

            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Admin Portal
            </h2>

            <NavItems />
          </div>
        </div>

        <div className="p-6 border-t border-zinc-100 bg-white space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors"
          >
            <Store size={18} />
            <span>Back to Store</span>
          </Link>
          {/* <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink> */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-left"
          >
            <DoorOpen size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white border-r border-zinc-200 z-50 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div>
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif font-bold tracking-tighter"
                  >
                    LUXE<span className="text-zinc-400">.</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-500 hover:text-zinc-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6 p-3 bg-zinc-50 rounded-xl">
                    <div className="size-10 rounded-full flex justify-center items-center bg-zinc-900 text-white font-semibold overflow-hidden shrink-0">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {profile.name}
                      </p>
                      <p className="text-xs text-zinc-500">{profile.role}</p>
                    </div>
                  </div>

                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    Admin Portal
                  </h2>

                  <NavItems onItemClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                  <Store size={18} />
                  <span>Back to Store</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminMenu;
