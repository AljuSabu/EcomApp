import React, { useContext, useEffect, useState, useRef } from "react";
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
import { Checkbox, Radio } from "antd";
import { price } from "../data/data";

// Debounce helper — waits 300ms before firing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(value), delay]);
  return debouncedValue;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);

  const isFirstRender = useRef(true);

  const { auth } = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  const debouncedChecked = useDebounce(checked, 300);
  const debouncedRadio = useDebounce(radio, 300);

  //Get all collections
  const getCollections = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      setCollections(data?.collection);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching collections");
    }
  };

  // Get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`/product/product-list/1`);

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

  // Load more functionality
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product/product-list/${page}`);

      if (data?.success) {
        setProducts((prev) => [...prev, ...data.products]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while loading more products");
    } finally {
      setLoading(false);
    }
  };

  // HandleFilter Function
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  // Filter products
  const filterProduct = async () => {
    try {
      setFiltering(true); // show loading before request
      const { data } = await axios.post("/product/product-filter", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFiltering(false); // hide loading after request
    }
  };

  // Get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // 1. Runs only once on mount
  useEffect(() => {
    getCollections();
    getTotal();
    getProducts();
  }, []);

  // 2. Runs only when page increases (load more)
  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 3. Runs only when filters actually change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!debouncedChecked.length && !debouncedRadio.length) {
      getProducts();
      return;
    }
    filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedChecked), JSON.stringify(debouncedRadio)]);

  // Reset filters and reload
  const handleReset = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getProducts();
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <section className="w-full mt-1 mb-20">
        <Carousel />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        <pre>{JSON.stringify(radio, null, 4)}</pre>
        <div className="flex justify-between items-end mb-16 mt-10 px-10">
          <div>
            <div>
              <h1>Collection Filter</h1>
              {collections.map((item) => {
                return (
                  <Checkbox
                    key={item._id}
                    onChange={(e) => handleFilter(e.target.checked, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                Price Filter
              </h3>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {price.map((item) => {
                  return (
                    <div key={item._id}>
                      <Radio value={item.arr}>{item.range}</Radio>
                    </div>
                  );
                })}
              </Radio.Group>
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-zinc-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-2 text-zinc-900 leading-tight">
              Featured Pieces
            </h2>
            <div>{total} products</div>
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
        </div>
        {/* Show skeleton cards while filtering */}
        {filtering ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-200 rounded-xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
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
        )}
        <div>
          {products && products.length < total && (
            <div className="flex justify-center mt-10">
              <button
                className="px-4 py-2 bg-zinc-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
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
