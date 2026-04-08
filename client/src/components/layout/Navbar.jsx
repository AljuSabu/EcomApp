import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  UserCircle,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  const userInitial = auth?.user?.name?.[0]?.toUpperCase() || "?";

  const userMenuRef = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "collection" },
    { name: "Products", path: "products" },
    { name: "About", path: "about" },
  ];

  //logout
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
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200 shadow-sm shadow-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            {/* LEFT PART */}
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tighter"
            >
              LUXE<span className="text-zinc-400">.</span>
            </Link>

            {/* MIDDLE PART */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-zinc-900 after:w-full" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* RIGHT PART */}
            <div className="hidden md:flex items-center ml-auto">
              <div
                className="relative group"
                ref={userMenuRef}
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button
                  className="flex items-center space-x-1 text-zinc-600 hover:text-zinc-900 transition-colors focus:outline-none py-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      auth?.user
                        ? "bg-zinc-400 text-white"
                        : "bg-zinc-100 text-black border-zinc-300 group-hover:bg-zinc-200"
                    }`}
                  >
                    {auth?.user ? (
                      <>
                        {userInitial || "?"}
                      </>
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-0 pt-2 w-48 z-50"
                    >
                      <div className="bg-white border border-zinc-100 shadow-xl py-2">
                        {auth?.user ? (
                          <>
                            <div className="px-4 py-2 border-b border-zinc-50 mb-1">
                              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                Account
                              </p>
                              <p className="text-sm font-medium text-zinc-900 truncate">
                                {auth?.user?.name}
                              </p>
                            </div>
                            <Link
                              to={`/dashboard/${auth.user.role === "admin" ? "admin" : "user"}`}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-zinc-600 hover:bg-primary/5 hover:text-primary transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LayoutDashboard size={16} />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              to="/profile"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-zinc-600 hover:text-primary transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserCircle size={16} />
                              <span>Profile</span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors text-left"
                            >
                              <LogOut size={16} />
                              <span>Logout</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="px-4 py-2 border-b border-zinc-50 mb-1">
                              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                Welcome
                              </p>
                              <p className="text-sm font-medium text-zinc-900">
                                Guest User
                              </p>
                            </div>
                            <Link
                              to="/login"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-zinc-600 hover:bg-primary/5 hover:text-primary transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LogIn size={16} />
                              <span>Login</span>
                            </Link>
                            <Link
                              to="/signup"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-zinc-600 hover:bg-primary/5 hover:text-primary transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserPlus size={16} />
                              <span>Sign Up</span>
                            </Link>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-600 hover:text-zinc-900 focus:outline-none"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-zinc-800"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-zinc-100 flex flex-col space-y-4">
                  <Link
                    to="login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-zinc-800"
                  >
                    <User />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
