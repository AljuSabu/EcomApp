import React, { useContext } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";

const ProductCard = ({ item, cart, setCart }) => {
  const { auth } = useContext(AuthContext);

  const handleAddToCart = () => {
    if(!auth?.user){
      return toast.error("Please login to add items to cart");
    }
    
    const exists = cart.find((p) => p._id === item._id);

    if (exists) {
      return toast.error("Already in cart");
    }

    setCart([...cart, item]);
    toast.success("Product added to cart")
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 flex flex-col">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={`http://localhost:4000/api/v1/product/product-photo/${item._id}`}
          alt={item.name}
          className="w-full h-90 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">
          {item.collection.name}
        </p>

        <h2 className="text-lg font-semibold text-zinc-900 truncate">
          {item.name}
        </h2>

        <p className="text-md font-medium text-zinc-700 mt-1">
          ₹{item.price}
        </p>

        <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex gap-3 pt-5 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2  hover:bg-zinc-800 transition"
          >
            <ShoppingCart size={16} />
            Add
          </button>

          <button className="flex items-center justify-center px-3 border border-zinc-200 hover:bg-zinc-100 transition">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;