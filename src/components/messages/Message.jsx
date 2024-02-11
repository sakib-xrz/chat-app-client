import { useStore } from "@/context/StoreProvider";
import useConversation from "@/store/useConversation";
import { formatMessengerTime } from "@/utils";

export default function Message({ message }) {
  const { user } = useStore();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
  const formattedTime = formatMessengerTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.photo : selectedConversation?.photo;
  const bubbleBgColor = fromMe
    ? "bg-blue-500 text-white"
    : "bg-white text-gray-700";

  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
}
