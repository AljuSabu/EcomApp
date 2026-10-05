import axios from "axios";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [stock, setStock] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const getCollection = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      if (data?.success) setCollections(data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/product/single-product/${params.slug}`,
      );
      setName(data?.product?.name || "");
      setDescription(data?.product?.description || "");
      setPrice(data?.product?.price || "");
      setStock(data?.product?.stock || "");
      setShipping(data?.product?.shipping || false);
      setCollection(data?.product?.collection?._id || "");
      setId(data?.product?._id || "");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while loading the product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Product name is required");
    if (!collection) return toast.error("Please select a collection");

    setIsSaving(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("collection", collection);
      productData.append("shipping", shipping);
      productData.append("stock", stock);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(
        `/product/update-product/${id}`,
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
      toast.error("Something went wrong while updating product");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-zinc-200 rounded w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <div className="md:col-span-2 bg-white rounded-xl border border-zinc-100 shadow-sm h-96" />
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm h-96" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <Link
            to="/dashboard/admin/products"
            className="inline-flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-3"
          >
            <ArrowLeft size={14} className="mr-1.5" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-serif mb-2">Update Product</h1>
          <p className="text-zinc-500 text-sm">
            Editing <span className="font-medium text-zinc-700">{name}</span>
          </p>
        </div>

        <button
          onClick={updateProduct}
          disabled={isSaving}
          className="bg-black text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Product"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {/* LEFT: FORM */}
        <div className="md:col-span-2 bg-white rounded-xl border border-zinc-100 shadow-sm">
          <div className="p-6 space-y-6">
            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block font-medium">
                Collection
              </label>
              <Select
                placeholder="Select collection"
                size="large"
                value={collection || undefined}
                className="w-full"
                onChange={(value) => setCollection(value)}
              >
                {collections.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block font-medium">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-zinc-200 bg-zinc-50 rounded-lg text-sm outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="text-xs uppercase text-zinc-500 mb-2 block font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-zinc-200 bg-zinc-50 rounded-lg text-sm outline-none focus:border-zinc-900"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-zinc-500 mb-2 block font-medium">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-200 bg-zinc-50 rounded-lg text-sm outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs uppercase text-zinc-500 mb-2 block font-medium">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-200 bg-zinc-50 rounded-lg text-sm outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={shipping}
                onChange={(e) => setShipping(e.target.checked)}
                className="accent-zinc-900"
              />
              <span className="text-sm text-zinc-600">Shipping Available</span>
            </label>
          </div>
        </div>

        {/* RIGHT: IMAGE PANEL */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center border border-dashed rounded-lg border-zinc-300 hover:border-zinc-900 p-6 cursor-pointer hover:bg-zinc-50 transition-colors"
          >
            <Upload className="text-zinc-400 mb-2" size={20} />
            <span className="text-sm text-zinc-500 text-center">
              {photo ? photo.name : "Upload new product image"}
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
          <div className="mt-6">
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : `http://localhost:4000/api/v1/product/product-photo/${id}`
              }
              alt="preview"
              className="w-full object-cover rounded-lg border border-zinc-200"
            />
          </div>
          {!photo && (
            <p className="text-[11px] text-zinc-400 mt-2 text-center">
              Current image — upload a new one above to replace it.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateProduct;
