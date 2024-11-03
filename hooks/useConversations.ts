import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversations = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    return Array.isArray(params?.conversation_id)
      ? params.conversation_id[0]
      : params?.conversation_id || null;
  }, [params]);

  const isOpen = useMemo(() => {
    return !!conversationId;
  }, [conversationId]);

  return {
    conversationId,
    isOpen,
  };
};

export default useConversations;
