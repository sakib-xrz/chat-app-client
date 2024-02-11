import useConversation from "@/store/useConversation";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { TiMessages } from "react-icons/ti";

export default function Messages() {
  const { messages, setMessages, selectedConversation } = useConversation();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const { isLoading } = useQuery({
    queryKey: [`messages/${selectedConversation?._id}`],
    queryFn: () =>
      APIKit.conversation
        .getMessages(selectedConversation?._id)
        .then(({ data }) => {
          setMessages(data);
          return data;
        }),
  });

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {isLoading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!isLoading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p> Send a message to start the conversation</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </div>
        </div>
      )}
    </div>
  );
}
