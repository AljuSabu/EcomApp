import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/card/ProductCard";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContex";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useContext(CartContext);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "/product/get-all-products",
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
        <title>Products</title>
      </Helmet>

      <div className="px-32 pt-10 pb-20">
        <h1 className="text-4xl font-serif mb-10">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
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

export default Products;
