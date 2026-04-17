import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import PageNotFound from "./pages/PageNotFound";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Orders from "./pages/user/Orders";
import WishList from "./pages/user/WishList";
import CreateCollection from "./pages/admin/ManageCollection";
import UserLayout from "./components/layout/userLayout/UserLayout";
import AdminLayout from "./components/layout/adminLayout/AdminLayout";
import ManageCollection from "./pages/admin/ManageCollection";
import ManageProduct from "./pages/admin/ManageProduct";
import AdminProfile from "./pages/admin/AdminProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<WishList />} />
            </Route>
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="manage-collection" element={<ManageCollection />} />
              <Route path="manage-product" element={<ManageProduct />} />
            </Route>
          </Route>

          <Route path="collection" element={<Collection />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
