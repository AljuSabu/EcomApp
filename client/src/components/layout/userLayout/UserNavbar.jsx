import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, ChevronRight, Menu } from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const UserNavbar = ({ setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { auth } = useContext(AuthContext);

  const profile = {
    name: auth?.user?.name || "Guest",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Guest",
      )}&background=18181b&color=fff`,
    memberTier: "Gold Member",
  };

  const getCurrentPageTitle = () => {
    if (location.pathname.includes("/dashboard/user/profile"))
      return "Profile & Settings";
    if (location.pathname.includes("/dashboard/user/orders"))
      return "My Orders";
    if (location.pathname.includes("/dashboard/user/wishlist"))
      return "Saved Wishlist";
    if (location.pathname.includes("/dashboard/user/cart")) return "Cart";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 sticky top-0 z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* min-w-0 lets the page title shrink and truncate instead of pushing the icons off-screen */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-zinc-600 hover:text-zinc-900 md:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-sm min-w-0">
          {/* "User Panel >" is hidden on phones to leave room for the page title */}
          <span className="hidden sm:inline text-zinc-400 font-medium whitespace-nowrap">
            User Panel
          </span>
          <ChevronRight size={14} className="hidden sm:block text-zinc-300" />
          <span className="font-semibold text-zinc-900 truncate">
            {getCurrentPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
        <Link
          to="/dashboard/user/wishlist"
          className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block"
          title="Wishlist"
        >
          <Heart size={18} />
          {wishlistCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard/user/cart"
          className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          title="Shopping Cart"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        <div className="h-5 w-px bg-zinc-200 hidden sm:block" />

        <Link
          to="/dashboard/user/profile"
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
              {profile.memberTier}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default UserNavbar;