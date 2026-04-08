import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageCollection = () => {
  const [collection, setCollection] = useState([]);

  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/collection/get-all-collection",
      );

      if (data?.success) {
        setCollection(data.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting collection");
    }
  };

  useEffect(() => {
    getCollection();
  }, []);
  return (
    <>
      <div className="w-6xl flex flex-col gap-10 items-center">
        <h1 className="text-4xl font-black text-zinc-400">Manage Collection</h1>
        <table className="border text-left w-2xl">
          <thead className="border">
            <tr className="text-2xl font-bold">
              <th className="p-3"></th>
              <th className="p-3">Collection Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {collection.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3"><Trash /></td>
                  <td className="p-3"><Pencil /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageCollection;
