import { useState, createContext, useEffect, useContext, useMemo } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartContextProvider = ({ children }) => {
  //Lazy initializer: reads localStorage once, before the first render
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  //Add Item (merges with an existing line if same product)
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + qty }
            : item,
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  const updateQuantity = (_id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item,
      ),
    );
  };

  //Save when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Total units in the cart
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 1), 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook, so components don't need to import useContext + CartContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export default CartContext;
