import { useState, createContext, useEffect, useContext, useMemo } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  cartCount: 0,
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

  //Remove Item
  const removeFromCart = (_id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === _id && item.selectedSize === size)),
    );
  };

  //Updating the Quantity
  const updateQuantity = (_id, size, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, item.quantity || 1) + change }
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
      value={{cart, setCart, cartCount, removeFromCart, updateQuantity}}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook, so components don't need to import useContext + CartContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export default CartContext;
