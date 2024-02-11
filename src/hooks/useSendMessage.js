import APIKit from "@/common/APIkit";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { toast } from "sonner";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();

  const sendMessage = async (message) => {
    try {
      const { data } = await APIKit.conversation.sendMessage(
        selectedConversation._id,
        { message }
      );

      setMessages([...messages, data]);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}
