import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import {
  Box,
  DoorOpen,
  Heart,
  Scale,
  Search,
  Settings,
  User,
} from "lucide-react";

const UserMenu = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const userInitial = auth?.user?.name?.[0]?.toUpperCase() || "?";

  const navigate = useNavigate()

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
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
      <div className="h-full p-3 space-y-2 w-60 bg-taupe-200 text-zinc-500 pt-5">
        <div className="flex items-center p-2 space-x-4">
          <div className="size-10 border rounded-full flex justify-center items-center bg-zinc-400 text-white text-xl">
            {userInitial}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{auth?.user?.name}</h2>
            <span className="flex items-center space-x-1">
              <div className="text-sm text-gray-700">{auth?.user?.role}</div>
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="">
              <NavLink className="flex items-center p-2 space-x-3 rounded-md">
                <User strokeWidth={1} />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <Box strokeWidth={1} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center p-2 space-x-3 rounded-md">
                <Search strokeWidth={1} />
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/orders"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <Scale strokeWidth={1} />
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/wishlist"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <Heart strokeWidth={1} />
                <span>Wishlist</span>
              </NavLink>
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <NavLink className="flex items-center p-2 space-x-3 rounded-md">
                <Settings strokeWidth={1} />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <div onClick={handleLogout} className="flex items-center p-2 space-x-3 rounded-md cursor-pointer">
                <DoorOpen strokeWidth={1} />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
