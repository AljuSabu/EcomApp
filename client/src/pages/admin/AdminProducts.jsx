import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Edit2, Trash2, Search, PackageSearch } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/product/get-all-products");

      if (data?.success) {
        setProducts(data.products);
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

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const { data } = await axios.delete(`/product/delete-product/${id}`);
      if (data?.success) {
        getProducts();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Manage Products</h1>
          <p className="text-zinc-500 text-sm">
            Edit, update, or remove items from your catalog.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-900 bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 animate-pulse space-y-4"
            >
              <div className="bg-zinc-200 aspect-4/5 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-16 text-center">
          <PackageSearch size={40} className="mx-auto text-zinc-300 mb-4" />
          <h3 className="text-lg font-serif mb-2 text-zinc-900">
            {products.length === 0 ? "No products yet" : "No products found"}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {products.length === 0
              ? "Add your first product to start building your catalog."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                    item.stock > 0
                      ? "bg-white/90 text-zinc-700"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {item.collection?.name && (
                  <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">
                    {item.collection.name}
                  </p>
                )}

                <h2 className="text-lg font-semibold text-zinc-900 truncate">
                  {item.name}
                </h2>

                <p className="text-md font-medium text-zinc-700 mt-1">
                  ₹{item.price}
                </p>

                <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex gap-3 pt-5 mt-auto">
                  <Link
                    to={`/dashboard/admin/product/${item.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 text-sm font-medium hover:bg-zinc-800 transition"
                  >
                    <Edit2 size={15} />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="flex items-center justify-center px-3 border border-zinc-200 text-zinc-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                    title="Delete product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
