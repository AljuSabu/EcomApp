import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "collection" },
    { name: "Products", path: "products" },
    { name: "About", path: "about" },
  ];
  const { auth, setAuth } = useContext(AuthContext);

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
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-serif font-bold tracking-tighter"
              >
                LUXE<span className="text-zinc-400">.</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
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

            <div className="hidden md:flex items-center space-x-5">
              {/* <button className="text-zinc-600 hover:text-zinc-900 transition-colors">
                <SearchIcon />
              </button> */}
              <Link
                to="/login"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <PersonOutlineIcon />
              </Link>
              <Link
                to="signup"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <PersonAddAltIcon />
              </Link>
              <NavLink onClick={handleLogout}>logout</NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-600 hover:text-zinc-900 focus:outline-none"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
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
                    <PersonOutlineIcon />
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
