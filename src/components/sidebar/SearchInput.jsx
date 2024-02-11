import APIKit from "@/common/APIkit";
import useConversation from "@/store/useConversation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => APIKit.user.getAllUser().then(({ data }) => data),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="w-full input border h-10 bg-transparent border-white/50 focus:border-white focus:outline-none text-white rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
