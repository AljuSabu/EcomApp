import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContex";
import Carousel from "../components/card/Carousel";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

      <section className="w-full mt-1 mb-20">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-zinc-900 py-24 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-8 leading-tight">
              Crafted with purpose, <br />
              worn with <span className="italic text-zinc-400">confidence</span>
              .
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              We believe that true luxury lies in simplicity and quality. Our
              pieces are designed to be timeless, durable, and ethically
              produced. Every detail is considered, from the source of our
              materials to the final stitch.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest group"
            >
              Our Story
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-zinc-800 overflow-hidden"
          >
            <img
              src="https://picsum.photos/seed/craft/800/800"
              alt="Craftsmanship"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
