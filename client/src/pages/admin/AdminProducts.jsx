import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

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
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/product/delete-product/${id}`,
      );
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
  return (
    <>
      <div>
        <h1 className="text-3xl font-serif mb-2">Products</h1>
        <div className="grid grid-cols-3 gap-10">
          {products.map((item) => {
            return (
              <div
                key={item._id}
                className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900"
              >
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${item._id}`}
                  alt=""
                  className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
                <div className="mt-6 mb-2">
                  <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
                    Price : {item.price}
                  </span>
                  <h2 className="text-xl font-semibold tracking-wide">
                    {item.name}
                  </h2>
                </div>
                <p className="dark:text-gray-800">{item.description}</p>
                <p className="text-gray-800 pt-2">Quantity : {item.quantity}</p>
                <p className="text-gray-800 pt-2">
                  Collection : {item.collection.name}
                </p>
                <div className="flex justify-center gap-6 text-white mt-5">
                  <Link
                    to={`/dashboard/admin/product/${item.slug}`}
                    className="px-2 py-2 bg-blue-500 rounded-md"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="px-2 py-2 bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
