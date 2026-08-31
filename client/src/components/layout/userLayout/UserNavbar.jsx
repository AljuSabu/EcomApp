import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, ChevronRight, Menu } from "lucide-react";
import { userProfileData } from "../../../data/data";
// import { useWishlist } from '../contexts/WishlistContext';
// import { useCart } from '../contexts/CartContext';
// import { useUser } from '../contexts/UserContext';

const UserNavbar = ({ setIsMobileMenuOpen }) => {
  const location = useLocation();
  //   const { wishlistCount } = useWishlist();
  //   const { cartCount } = useCart();
  //   const { profile } = useUser();
  const [profile] = useState(userProfileData[0]);

  const getCurrentPageTitle = () => {
    if (location.pathname.includes("/user/profile"))
      return "Profile & Settings";
    if (location.pathname.includes("/user/orders")) return "My Orders";
    if (location.pathname.includes("/user/wishlist")) return "Saved Wishlist";
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
          <span className="text-zinc-400 font-medium">User Panel</span>
          <ChevronRight size={14} className="text-zinc-300" />
          <span className="font-semibold text-zinc-900">
            {getCurrentPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          to="/cart"
          className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          title="Shopping Cart"
        >
          <ShoppingBag size={18} />
          {/* {cartCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )} */}
        </Link>

        <Link
          to="/user/wishlist"
          className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block"
          title="Wishlist"
        >
          <Heart size={18} />
          {/* {wishlistCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )} */}
        </Link>

        <div className="h-5 w-px bg-zinc-200 hidden sm:block" />

        <Link to="/user/profile" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 group-hover:border-primary transition-colors">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-zinc-900 group-hover:text-primary transition-colors leading-tight">
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
