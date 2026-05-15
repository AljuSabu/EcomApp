import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContex";
import Carousel from "../components/card/Carousel";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { auth } = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/product/get-all-products",
      );

      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="min-h-screen w-full mt-1 mb-20">
        <Carousel />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        <div className="flex justify-between items-end mb-16 mt-10 px-10">
          <div>
            <h2 className="text-3xl font-serif mb-2 text-zinc-900 leading-tight">
              Featured Pieces
            </h2>
            <p className="text-zinc-500">
              Handpicked selections from our latest drop.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold uppercase tracking-widest border-b border-zinc-900 pb-1 hover:text-primary hover:border-primary transition-all"
          >
            View All
          </Link>
        </div>{" "}
        <div className="grid grid-cols-4 gap-10 px-10">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
