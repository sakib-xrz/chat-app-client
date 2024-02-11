import { useEffect } from "react";

import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/store/useConversation";

const notificationSound =
  "https://2u039f-a.akamaihd.net/downloads/ringtones/files/mp3/facebook-messenger-tone-wapking-fm-mp3-17015-19072-43455.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
