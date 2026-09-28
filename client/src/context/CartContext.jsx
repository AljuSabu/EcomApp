import { useState, createContext, useEffect } from "react";

const CartContext = createContext({
  cart: [],
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //Remove Item
  const removeFromCart = (_id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === _id && item.selectedSize === size)),
    );
  };

  //Updating the Quantity
  const updateQuantity = (_id, size, change) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === _id && item.selectedSize === size) {
          const currentQuantity = item.quantity || 1;
          return {
            ...item,
            quantity: Math.max(1, currentQuantity + change),
          };
        }
        return item;
      }),
    );
  };

  //Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //Save when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={[cart, setCart, removeFromCart, updateQuantity]}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
