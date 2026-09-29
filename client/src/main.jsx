import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistContextProvider>
    </CartContextProvider>
  </AuthContextProvider>,
);
