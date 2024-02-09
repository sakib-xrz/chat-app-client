import { IoSearchSharp } from "react-icons/io5";

export default function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="w-full input border h-10 bg-transparent border-white/50 focus:border-white focus:outline-none text-white rounded-full"
      />
    </form>
  );
}
