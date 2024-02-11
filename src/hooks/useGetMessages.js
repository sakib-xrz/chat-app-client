import APIKit from "@/common/APIkit";
import useConversation from "@/store/useConversation";
import { useQuery } from "@tanstack/react-query";

export default function useGetMessages() {
  const { messages, setMessages, selectedConversation } = useConversation();

  const { data, isLading } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      APIKit.conversation
        .getMessages(selectedConversation._id)
        .then(({ data }) => data),
  });
  setMessages(data);
  return { messages, isLading };
}
