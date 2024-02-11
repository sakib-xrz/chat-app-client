import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";

export default function Messages() {
  // const { isLading, messages } = useGetMessages();
  // console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
    </div>
  );
}
