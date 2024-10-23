import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const useTextarea = (formRef?: MutableRefObject<HTMLFormElement | null>) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [shouldSubmitOnEnter, setShouldSubmitOnEnter] = useState(true);
  const [shouldAutoSize, setShouldAutoSize] = useState(true);

  const textarea = textareaRef.current;

  const resetSize = () => {
    if (textarea) textarea.style.height = "auto";
  };

  const handleAutoSize = useCallback(() => {
    if (!textarea) return;

    textarea.style.transition = "max-height 0.2s ease-in-out";

    textarea.style.height = "auto";

    const textareaStyles = getComputedStyle(textarea);
    const maxHeight = parseInt(textareaStyles.maxHeight);

    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  }, [textarea]);

  useEffect(() => {
    handleAutoSize();
  }, [handleAutoSize, textarea]);

  useEffect(() => {
    const submitTextareaOnEnter = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef?.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    };

    if (shouldSubmitOnEnter) {
      if (textarea) {
        textarea.addEventListener("keydown", submitTextareaOnEnter);
      }

      return () => {
        if (textarea) {
          textarea.removeEventListener("keydown", submitTextareaOnEnter);
        }
      };
    }
  }, [shouldSubmitOnEnter, textarea, formRef]);

  useEffect(() => {
    if (shouldAutoSize) {
      if (textarea) {
        textarea.addEventListener("input", handleAutoSize);
      }

      return () => {
        if (textarea) {
          textarea.removeEventListener("input", handleAutoSize);
        }
      };
    }
  }, [textarea, shouldAutoSize, handleAutoSize]);

  const disableAutoSize = () => {
    setShouldAutoSize(false);
  };

  const disableSumbitOnEnter = () => {
    setShouldSubmitOnEnter(false);
  };

  return {
    textareaRef,
    formRef,
    resetSize,
    disableAutoSize,
    disableSumbitOnEnter,
    handleAutoSize,
  };
};

export default useTextarea;
