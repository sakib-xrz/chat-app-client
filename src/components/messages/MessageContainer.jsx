import useConversation from "@/store/useConversation";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import { useStore } from "@/context/StoreProvider";
import { TiMessages } from "react-icons/ti";
import Messages from "./Messages";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="border-b border-slate-500 px-4 py-2 mb-2">
            <span className="text-white font-semibold">To:</span>{" "}
            <span className="text-white font-semibold">
              {selectedConversation.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { user } = useStore();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
