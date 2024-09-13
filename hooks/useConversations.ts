import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversations = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId;
  }, [params]);

  const isOpen = useMemo(() => {
    return !!conversationId;
  }, [conversationId]);

  return useMemo(() => {
    return {
      conversationId,
      isOpen,
    };
  }, [conversationId, isOpen]);
};

export default useConversations;
