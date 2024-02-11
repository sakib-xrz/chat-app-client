import useGetConversations from "@/hooks/useGetConversations";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { toast } from "sonner";

// Debounce function to delay search execution
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length >= 3) {
      const conversation = conversations.find((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, 400);

  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="w-full input border h-10 bg-transparent border-white/50 focus:border-white focus:outline-none text-white rounded-full"
        value={search}
        onChange={(e) => {
          handleSearch(e);
          debouncedSearch(e.target.value);
        }}
      />
    </form>
  );
}
