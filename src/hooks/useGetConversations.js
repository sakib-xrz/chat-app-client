import APIKit from "@/common/APIkit";
import { useQuery } from "@tanstack/react-query";

export default function useGetConversations() {
  const { data: conversations, isLading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => APIKit.user.getAllUser().then(({ data }) => data),
  });
  return { conversations, isLading };
}
