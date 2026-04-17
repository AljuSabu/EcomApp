import { Plus } from "lucide-react";
import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="gap-10 flex justify-between items-center"
      >
        <div className="space-y-2 w-full">
          <input
            type="text"
            placeholder="e.g. Autumn Vibes"
            className="w-full px-4 h-12 bg-zinc-50 border border-zinc-200 focus:outline-none transition-colors text-sm"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-900 text-white h-12 w-50 text-sm font-bold transition-colors rounded-md flex items-center justify-center"
        >
          <Plus size={16} className="mr-2" />
          Create Collection
        </button>
      </form>
    </>
  );
};

export default CollectionForm;
