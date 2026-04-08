import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DoorOpen,
  Layers,
  LayoutDashboard,
  PackagePlus,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

const AdminMenu = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const userInitial = auth?.user?.name?.[0]?.toUpperCase() || "?";

  const navigate = useNavigate();

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
      <div className="h-full p-3 space-y-2 w-60 bg-taupe-200 text-zinc-500">
        <div className="flex items-center p-2 space-x-4">
          <div className="size-10 border rounded-full flex justify-center items-center bg-zinc-400 text-white text-xl">
            {userInitial}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{auth?.user?.name}</h2>
            <span className="flex items-center space-x-1">
              <div className="text-xs hover:underline text-gray-700">
                {auth?.user?.role}
              </div>
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
                to="/dashboard/admin"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <LayoutDashboard strokeWidth={1} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-collection"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <Layers strokeWidth={1} />
                <span>Manage Collection</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-product"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <ShoppingBag strokeWidth={1} />
                <span>Manage Product</span>
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

export default AdminMenu;
