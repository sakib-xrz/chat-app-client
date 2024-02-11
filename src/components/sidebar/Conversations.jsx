import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emoji";
import useGetConversations from "@/hooks/useGetConversations";

export default function Conversations() {
  const { conversations, isLading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {isLading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}
