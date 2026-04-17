import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import CollectionForm from "../../components/forms/CollectionForm";
import { Modal, Input } from "antd";

const ManageCollection = () => {
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Create Collection
  const createCollection = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/collection/create-collection",
        { name },
      );
      if (data?.success) {
        toast.success(data?.message);
        getCollection();
        setName("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating collection");
    }
  };

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

  const deleteCollection = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/collection/delete-collection/${id}`,
      );
      if (data?.success) {
        getCollection();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete collection");
    }
  };

  // Update Collection
  const updateCollection = async () => {
    if (!updatedName.trim()) {
      return toast.error("Collection name is required");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/collection/update-collection/${selectedCollection._id}`,
        { name: updatedName },
      );

      if (data?.success) {
        toast.success(data.message);
        setIsModalOpen(false);
        getCollection();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating collection");
    }
  };

  return (
    <>
      <div className="w-6xl flex flex-col gap-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif mb-2">Manage Collections</h1>
            <p className="text-zinc-500">
              Organize and curate your product series.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Create Collection Section */}
          <CollectionForm
            handleSubmit={createCollection}
            value={name}
            setValue={setName}
          />

          {/* Collections Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-300/80 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-zinc-100 flex justify-between items-center">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search collections..."
                    className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-indigo-900/50 w-124"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-300/50 border-b border-zinc-100">
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                        Collection
                      </th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-zinc-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/50">
                    {collection.map((col) => (
                      <tr
                        key={col._id}
                        className="hover:bg-zinc-200/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-900">
                            {col.name}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2 ">
                            <button
                              onClick={() => {
                                setSelectedCollection(col);
                                setUpdatedName(col.name);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-zinc-400 hover:text-indigo-900 transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => {
                                deleteCollection(col._id);
                              }}
                              className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Edit Collection"
        open={isModalOpen}
        onOk={updateCollection}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="Enter collection name"
          required
        />
      </Modal>
    </>
  );
};

export default ManageCollection;
