import React, { useContext, useState } from "react";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [loaded, setLoaded] = useState(false);

  const { auth } = useContext(AuthContext);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const isWishlisted = isInWishlist(item._id);
  const isInCart = cart.some((p) => p._id === item._id);

  const handleWishlist = () => {
    if (!auth?.user) {
      return toast.error("Please login to save items to your wishlist");
    }
    toggleWishlist(item);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    if (!auth?.user) {
      return toast.error("Please login to add items to cart");
    }

    if (isInCart) {
      return toast.error("Already in cart");
    }

    addToCart(item, 1);
    toast.success("Product added to cart");
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 flex flex-col">
      {/* Image */}
      <div className="overflow-hidden relative">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200" />
        )}

        <img
          src={`http://localhost:4000/api/v1/product/product-photo/${item._id}`}
          alt={item.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-72 md:h-80 xl:h-90 object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-zinc-600 hover:text-rose-500"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 xl:p-5 flex flex-col flex-1">
        {item.collection?.name && (
          <p className="text-xs uppercase tracking-wider sm:tracking-widest text-zinc-400 mb-1">
            {item.collection.name}
          </p>
        )}

        <Link to={`/products/${item.slug}`}>
          <h2 className="text-base sm:text-lg font-semibold text-zinc-900 truncate">
            {item.name}
          </h2>
        </Link>

        <p className="text-sm sm:text-base font-medium text-zinc-700 mt-1">
          ₹{item.price}
        </p>

        <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex gap-2 sm:gap-3 pt-4 xl:pt-5 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 text-sm sm:text-base hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition"
          >
            <ShoppingCart size={16} />
            {isInCart ? "In Cart" : "Add"}
          </button>

          <Link
            to={`/products/${item.slug}`}
            title="View details"
            className="flex items-center justify-center px-3 border border-zinc-200 hover:bg-zinc-100 transition"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition pointer-events-none"></div>
    </div>
  );
};

export default React.memo(ProductCard);