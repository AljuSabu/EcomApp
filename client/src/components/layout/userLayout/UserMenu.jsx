import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useWishlist } from "../../../context/WishlistContext";
import axios from "axios";
import { toast } from "sonner";
import {
  LayoutDashboard,
  User,
  ShoppingCart,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  Store,
  X,
  Sparkles,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { userOrder } from "../../../data/data";

const UserMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  // Build a display profile from real auth data + placeholder extras.
  const profile = {
    name: auth?.user?.name || "Guest",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Guest",
      )}&background=18181b&color=fff`,
    memberTier: "Gold Member",
  };

  // TEMP: derived from mock userOrder data until a real orders API/context exists.
  const activeOrdersCount = userOrder.filter(
    (o) => o.status === "In Transit" || o.status === "Processing",
  ).length;

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/logout",
      );
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

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard/user",
      end: true,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Profile",
      path: "/dashboard/user/profile",
      icon: User,
      badge: null,
    },
    {
      name: "Orders",
      path: "/dashboard/user/orders",
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} active` : null,
      badgeColor: "bg-blue-50 text-blue-700",
    },
    {
      name: "Wishlist",
      path: "/dashboard/user/wishlist",
      icon: Heart,
      badge: wishlistCount > 0 ? `${wishlistCount}` : null,
      badgeColor: "bg-rose-50 text-rose-600",
    },
    {
      name: "Cart",
      path: "/dashboard/user/cart",
      icon: ShoppingCart,
      badge: null,
      badgeColor: "bg-rose-50 text-rose-600",
    },
  ];

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
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              <Sparkles size={10} className="mr-1" />
              Member
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                User Portal
              </h2>
              <span className="text-[10px] text-zinc-400 font-mono font-medium">
                v1.2
              </span>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
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
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          location.pathname.startsWith(item.path)
                            ? "bg-white/20 text-white"
                            : item.badgeColor || "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </NavLink>
              ))}
            </nav>
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-left"
          >
            <LogOut size={18} />
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
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {profile.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {profile.memberTier}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    User Portal
                  </h2>
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.end}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-zinc-900 text-white shadow-md"
                              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                          }`
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon size={18} />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              location.pathname.startsWith(item.path)
                                ? "bg-white/20 text-white"
                                : item.badgeColor || "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </nav>
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

export default UserMenu;
