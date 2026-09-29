import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext({
  wishlist: [],
  setWishlist: () => {},
  wishlistCount: 0,
  isInWishlist: () => false,
  toggleWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (_id) => wishlist.some((item) => item._id === _id);

  // Add if not present, remove if present
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item._id === product._id)
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product],
    );
  };

  const removeFromWishlist = (_id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== _id));
  };

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
