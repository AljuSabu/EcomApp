import axios from "axios";
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const ManageProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/collection/get-all-collection",
      );
      if (data?.success) setCollections(data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  const createProduct = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("collection", collection);
      productData.append("quantity", quantity);
      productData.append("photo", photo);

      const { data } = await axios.postForm(
        "http://localhost:4000/api/v1/product/create-product",
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

        <button
          onClick={createProduct}
          className="bg-indigo-800 text-white px-6 py-3 text-xs font-bold rounded-md uppercase tracking-widest hover:bg-indigo-900 transition-colors"
        >
          Save Product
        </button>
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

            {/* Price + Quantity */}
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
          {photo && (
            <div className="mt-6">
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="w-full object-cover border border-zinc-200"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ManageProduct;
