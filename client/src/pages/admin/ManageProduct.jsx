import axios from "axios";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Edit2, Search, Trash2, Upload, PackageSearch } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getCollection = async () => {
    try {
      const { data } = await axios.get("/collection/get-all-collection");
      if (data?.success) setCollections(data.collection);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setPhoto(null);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCollection(product.collection?._id || "");
    setStock(product.stock);
    setShipping(product.shipping);

    window.scrollTo({ top: 0, behavior: "smooth" });
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
        getProducts();
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the product");
    }
  };

  // Was missing entirely — the Delete button previously had no handler at all
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const { data } = await axios.delete(`/product/delete-product/${id}`);
      if (data?.success) {
        toast.success(data.message);
        getProducts();
        if (editingProduct?._id === id) resetForm();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Manage Products</h1>
          <p className="text-zinc-500 text-sm">
            Add, edit, and manage your inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {editingProduct && (
            <button
              onClick={resetForm}
              className="border border-zinc-200 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            onClick={editingProduct ? handleUpdate : createProduct}
            className="bg-black text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
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

          {(photo || editingProduct) && (
            <div className="mt-6">
              <img
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : `http://localhost:4000/api/v1/product/product-photo/${editingProduct?._id}`
                }
                alt="preview"
                className="w-full object-cover rounded-lg border border-zinc-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-900 w-full transition-colors"
            />
          </div>
          <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <PackageSearch size={36} className="mx-auto text-zinc-300 mb-3" />
            <p className="text-sm font-medium text-zinc-700">
              {products.length === 0 ? "No products yet" : "No products found"}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              {products.length === 0
                ? "Add your first product using the form above."
                : "Try a different search term."}
            </p>
          </div>
        ) : (
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
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-zinc-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-zinc-100 overflow-hidden rounded-lg border border-zinc-200 shrink-0">
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
                      {product.collection?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-zinc-900">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.stock > 0 ? (
                        <span className="text-zinc-600">{product.stock}</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-50 text-rose-600">
                          Out of stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
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
        )}
      </div>
    </motion.div>
  );
};

export default ManageProduct;
