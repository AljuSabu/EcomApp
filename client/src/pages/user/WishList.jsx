import { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  // Eye,
  CheckCircle2,
} from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";

const WishlistCard = ({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const { removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const isInCart = cart.some((p) => p._id === item._id);

  const handleAddToCart = () => {
    if (isInCart) return toast.error("Already in cart");
    addToCart(item, 1);
    toast.success(`"${item.name}" added to cart`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 flex flex-col"
    >
      {/* Image */}
      <div className="overflow-hidden relative">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200" />
        )}

        <img
          src={
            item.image ||
            `http://localhost:4000/api/v1/product/product-photo/${item._id}`
          }
          alt={item.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-90 object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <button
          onClick={() => removeFromWishlist(item._id)}
          aria-label="Remove from wishlist"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white hover:scale-110 transition"
          title="Remove from Wishlist"
        >
          <Heart size={18} className="fill-rose-500 text-rose-500" />
        </button>

        {/* <Link
          to={`/product/${item._id}`}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="bg-white text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow-lg flex items-center">
            <Eye size={12} className="mr-1.5" />
            View Product
          </span>
        </Link> */}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {item.collection?.name && (
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">
            {item.collection.name}
          </p>
        )}

        <h2 className="text-lg font-semibold text-zinc-900 truncate">
          {item.name}
        </h2>

        <p className="text-md font-medium text-zinc-700 mt-1">₹{item.price}</p>

        {item.description && (
          <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex gap-3 pt-5 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 hover:bg-zinc-800 transition disabled:bg-zinc-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            {isInCart ? "In Cart" : "Add"}
          </button>

          <button
            onClick={() => removeFromWishlist(item._id)}
            className="flex items-center justify-center px-3 border border-zinc-200 hover:bg-zinc-100 transition"
            title="Remove"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition pointer-events-none" />
    </motion.div>
  );
};

const UserWishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => addToCart(item, 1));
    showToast(`All ${wishlist.length} wishlist items added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-4xl font-serif">Saved Wishlist</h1>
            <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-200/60 rounded-full text-xs font-bold font-mono">
              {wishlist.length}
            </span>
          </div>
          <p className="text-zinc-500 mt-3 text-sm">
            Curate and save your coveted luxury pieces for later or move them
            directly to your cart.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 border border-zinc-200 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm flex items-center"
            >
              <ShoppingCart size={14} className="mr-2" />
              Add All to Cart
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold uppercase tracking-wider flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <Link
              to="/dashboard/user/cart"
              className="underline font-bold hover:text-emerald-950"
            >
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {wishlist.length === 0 ? (
        <div className="bg-white border border-zinc-100 rounded-xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-400">
            <Heart size={32} />
          </div>
          <h2 className="text-3xl font-serif text-zinc-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            You haven't saved any items to your wishlist yet. Browse our catalog
            to save items you love.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg"
          >
            Explore Catalog
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlist.map((item) => (
              <WishlistCard key={item._id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default UserWishlist;
