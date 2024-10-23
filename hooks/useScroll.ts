import { useCallback, useEffect, useRef, useState } from "react";

const useScroll = <RefType extends HTMLElement>() => {
  const ref = useRef<RefType>(null);

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    if (ref.current)
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior,
      });
  }, []);

  const scrollToTop = useCallback((behavior: ScrollBehavior = "auto") => {
    if (ref.current) ref.current.scrollTo({ top: 0, behavior });
  }, []);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      const isScrolledToBottom = scrollTop + clientHeight < scrollHeight - 200;

      setShowScrollToBottom(isScrolledToBottom);
    }
  }, []);

  useEffect(() => {
    const refCurrent = ref.current;
    if (refCurrent) {
      console.log("useEffect");
      refCurrent.addEventListener("scroll", handleScroll);

      return () => {
        refCurrent.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return {
    ref,
    showScrollToBottom,
    setShowScrollToBottom,
    scrollToBottom,
    scrollToTop,
  };
};

export default useScroll;
