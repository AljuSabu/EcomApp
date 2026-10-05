import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/card/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { ChevronDown, Filter, X } from "lucide-react";
import { Radio, Select } from "antd";
import { price } from "../data/data";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCollections = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      setCollections(data?.collection || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching collections");
    }
  };

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

  const handleCollectionChange = (collectionId) => {
    setActiveCollection(collectionId || null);
    filterProducts(collectionId || null, radio);
  };

  const handlePriceFilter = (value) => {
    setRadio(value);
    filterProducts(activeCollection, value);
  };

  const resetFilters = () => {
    setActiveCollection(null);
    setRadio([]);
    setProducts(allProducts);
  };

  useEffect(() => {
    getCollections();
    getProducts();
  }, []);

  const activeFilterCount = (activeCollection ? 1 : 0) + (radio.length ? 1 : 0);
  const activeCollectionName = collections.find(
    (c) => c._id === activeCollection,
  )?.name;

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="px-6 sm:px-12 lg:px-32 pt-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-4xl font-serif mb-2">All Products</h1>
            <p className="text-zinc-500 text-sm max-w-md">
              Thoughtfully made essentials, built to outlast the trend cycle.
            </p>
          </div>

          <div ref={filterRef} className="relative self-start md:self-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center text-sm font-medium text-zinc-900 border border-zinc-200 rounded-lg px-4 py-2.5 hover:bg-zinc-50 transition-colors"
            >
              <Filter size={16} className="mr-2" />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`ml-2 transition-transform duration-300 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-80 z-50"
                >
                  <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-lg">
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                        Collection
                      </h3>
                      <Select
                        placeholder="All Collections"
                        size="large"
                        allowClear
                        value={activeCollection || undefined}
                        className="w-full"
                        onChange={(value) => handleCollectionChange(value)}
                        onClear={() => handleCollectionChange(null)}
                      >
                        {collections.map((item) => (
                          <Option key={item._id} value={item._id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                        Price
                      </h3>
                      <Radio.Group
                        onChange={(e) => handlePriceFilter(e.target.value)}
                        value={radio}
                        className="w-full"
                      >
                        <div className="flex flex-col gap-3">
                          {price.map((item) => (
                            <Radio
                              key={item._id}
                              value={item.arr}
                              className="flex items-center text-sm text-zinc-700"
                            >
                              {item.range}
                            </Radio>
                          ))}
                        </div>
                      </Radio.Group>
                    </div>

                    <button
                      onClick={resetFilters}
                      className="mt-6 w-full px-4 py-2.5 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Result count */}
        {!loading && !filtering && (
          <p className="text-xs text-zinc-400 mb-4">
            Showing {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
            {activeCollectionName ? ` in ${activeCollectionName}` : ""}
          </p>
        )}

        {/* Active filter chips */}
        {(activeCollectionName || radio.length > 0) && (
          <div className="flex items-center flex-wrap gap-2 mb-8">
            {activeCollectionName && (
              <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {activeCollectionName}
                <button
                  onClick={() => handleCollectionChange(null)}
                  className="hover:text-zinc-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {radio.length > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full">
                ₹{radio[0]} – ₹{radio[1]}
                <button
                  onClick={() => handlePriceFilter([])}
                  className="hover:text-zinc-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Intro line above the grid */}
        {!loading && !filtering && products.length > 0 && (
          <div className="max-w-2xl mb-10">
            <p className="text-zinc-600 text-sm leading-relaxed">
              Every piece is made in small batches with natural materials — no
              overstock, no filler. What's here is what we stand behind.
            </p>
          </div>
        )}

        {loading || filtering ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse space-y-4">
                <div className="bg-zinc-200 aspect-3/4 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-zinc-900 text-lg font-serif mb-2">
              No matches found
            </p>
            <p className="text-zinc-500 text-sm mb-6">
              Try adjusting your filters, or browse the full collection instead.
            </p>
            <button
              onClick={resetFilters}
              className="text-sm font-bold uppercase tracking-widest text-zinc-900 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
