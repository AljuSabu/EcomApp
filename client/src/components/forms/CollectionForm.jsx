import { Plus } from "lucide-react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex flex-col sm:flex-row sm:items-center"
    >
      <input
        type="text"
        placeholder="e.g. Autumn Vibes"
        className="w-full px-4 h-12 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 transition-colors text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        type="submit"
        className="bg-black text-white h-12 px-6 sm:w-56 shrink-0 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
      >
        <Plus size={16} className="mr-2" />
        Create Collection
      </button>
    </form>
  );
};

export default CollectionForm;
