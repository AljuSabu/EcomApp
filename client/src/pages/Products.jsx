import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/card/ProductCard";
import { toast } from "sonner";
import CartContext from "../context/CartContex";
import axios from "axios";
import { ChevronDown, Filter } from "lucide-react";
import { Radio } from "antd";
import { price } from "../data/data";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [cart, setCart] = useContext(CartContext);

  const userMenuRef = useRef(null);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get all Collections
  const getCollections = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      setCollections(data?.collection);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  // Get all Products
  const getProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/product/get-all-products");

      if (data?.success) {
        setProducts(data.products);
        setAllProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  };

  // Filter Function
  const filterProducts = async (selectedCollection, selectedPrice) => {
    try {
      setFiltering(true);

      const checked = selectedCollection ? [selectedCollection] : [];

      const { data } = await axios.post("/product/product-filter", {
        checked,
        radio: selectedPrice,
      });

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while filtering");
    } finally {
      setFiltering(false);
    }
  };

  // HandleFilter Function
  const handleFilter = (collectionId) => {
    if (activeCollection === collectionId) {
      setActiveCollection(null);
      setRadio([]);
      setProducts(allProducts);
      return;
    }

    setActiveCollection(collectionId);

    filterProducts(collectionId, radio);
  };

  // Handle Price Filter Function
  const handlePriceFilter = (value) => {
    setRadio(value);

    filterProducts(activeCollection, value);
  };

  // Updating Screen
  useEffect(() => {
    getCollections();
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="px-32 pt-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4">
          <h1 className="text-4xl font-serif mb-10">All Products</h1>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full">
              <button
                onClick={() => {
                  setActiveCollection(null);
                  setProducts(allProducts);
                }}
                className={`text-sm font-medium whitespace-nowrap px-4 py-1 rounded-full transition-all ${
                  activeCollection === null
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                All
              </button>
              {collections.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handleFilter(item._id)}
                  className={`text-sm font-medium whitespace-nowrap px-4 py-1 rounded-full transition-all ${
                    activeCollection === item._id
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div
              className="relative group"
              ref={userMenuRef}
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen) }
                className="flex items-center text-sm font-medium text-zinc-900 border-l border-zinc-300 pl-6"
              >
                <Filter size={16} className="mr-2" />
                Filter
                <ChevronDown
                  size={14}
                  className={`ml-1 transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-2 w-50 z-50"
                  >
                    <div className="mt-6 border border-zinc-200 rounded-2xl p-6 bg-white max-w-sm shadow-sm">
                      <h3 className="font-semibold mb-4">
                        Price Filter
                      </h3>

                      <Radio.Group
                        onChange={(e) => handlePriceFilter(e.target.value)}
                        value={radio}
                      >
                        <div className="space-y-3">
                          {price.map((item) => (
                            <Radio key={item._id} value={item.arr}>
                              {item.range}
                            </Radio>
                          ))}
                        </div>
                      </Radio.Group>

                      <button
                        onClick={() => {
                          setRadio([]);
                          setActiveCollection(null);
                          getProducts();
                        }}
                        className="mt-6 px-4 py-2 bg-zinc-900 text-white text-xs uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {loading || filtering ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse space-y-4">
                <div className="bg-zinc-200 aspect-3/4 rounded-md" />

                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}

        {products.length === 0 && (
          <div className="py-55 text-center">
            <p className="text-zinc-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
