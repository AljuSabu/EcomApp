import axios from "axios";
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Edit2, Filter, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const ManageProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [stock, setStock] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();

  // Get Collections
  const getCollection = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      if (data?.success) setCollections(data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Product
  const createProduct = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("collection", collection);
      productData.append("stock", stock);
      productData.append("shipping", shipping);
      productData.append("photo", photo);

      const { data } = await axios.postForm(
        "/product/create-product",
        productData,
      );
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when creating product");
    }
  };

  // Get Products
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/product/get-all-products");
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
    getCollection();
    getProducts();
  }, []);

  const resetForm = () => {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setPrice(0);
    setCollection("");
    setStock("");
    setShipping(false);
    setPhoto(null);
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);

    setPhoto(null);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCollection(product.collection._id);
    setStock(product.stock);
    setShipping(product.shipping);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("collection", collection);
      productData.append("stock", stock);
      productData.append("shipping", shipping);

      if (photo) {
        productData.append("photo", photo);
      }

      const { data } = await axios.put(
        `/product/update-product/${editingProduct._id}`,
        productData,
      );

      if (data?.success) {
        toast.success(data.message);

        // refresh list
        getProducts();

        // reset form
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the product");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Manage Products</h1>
          <p className="text-zinc-500 text-sm">
            Add, edit, and manage your inventory.
          </p>
        </div>

        <div className="space-x-5">
          {editingProduct && (
            <button
              onClick={resetForm}
              className="ml-3 border border-zinc-300 px-6 py-3 text-xs font-bold rounded-md uppercase tracking-widest hover:bg-zinc-200/60"
            >
              Cancel
            </button>
          )}

          <button
            onClick={editingProduct ? handleUpdate : createProduct}
            className="bg-indigo-800 text-white px-6 py-3 text-xs font-bold rounded-md uppercase tracking-widest hover:bg-indigo-900 transition-colors"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-6xl">
        {/* LEFT: FORM */}
        <div className="md:col-span-2 bg-white border border-zinc-200">
          <div className="p-6 space-y-6">
            {/* Collection */}
            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block">
                Collection
              </label>
              <Select
                placeholder="Select collection"
                size="large"
                value={collection || undefined}
                className="w-full custom-select!"
                onChange={(value) => setCollection(value)}
              >
                {collections.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Name */}
            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-200 bg-zinc-50 rounded-md text-sm focus:outline-none focus:border-indigo-900/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-200 bg-zinc-50 rounded-md text-sm focus:outline-none focus:border-indigo-900"
                rows={4}
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-zinc-500 mb-2 block">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 bg-zinc-50 rounded-md text-sm focus:outline-none focus:border-indigo-900"
                />
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-500 mb-2 block">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-200 bg-zinc-50 rounded-md text-sm focus:outline-none focus:border-indigo-900"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={shipping}
                onChange={(e) => setShipping(e.target.checked)}
              />
              <span className="text-sm text-zinc-600">Shipping Available</span>
            </div>
          </div>
        </div>

        {/* RIGHT: IMAGE PANEL */}
        <div className="bg-white border border-zinc-200 p-6">
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center border border-dashed rounded-md border-zinc-300 hover:border-indigo-900 p-6 cursor-pointer hover:bg-zinc-50 transition"
          >
            <Upload className="text-zinc-400 mb-2" size={20} />
            <span className="text-sm text-zinc-500 text-center">
              {photo ? photo.name : "Upload product image"}
            </span>

            <input
              id="upload"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>

          {/* Preview */}
          {(photo || editingProduct) && (
            <div className="mt-6">
              <img
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : `http://localhost:4000/api/v1/product/product-photo/${editingProduct?._id}`
                }
                alt="preview"
                className="w-full object-cover border border-zinc-200"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name..."
              className="pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-indigo-900/50 w-full transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Collection
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Stock
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-zinc-100 overflow-hidden rounded border border-zinc-200 fle shrink-0">
                        <img
                          src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 leading-none mb-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate max-w-50">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {product.collection.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-zinc-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-2 text-zinc-400 hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageProduct;
