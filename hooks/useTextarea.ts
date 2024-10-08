import { MutableRefObject, useEffect, useRef, useState } from "react";

const useTextarea = (formRef?: MutableRefObject<HTMLFormElement | null>) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [shouldSubmitOnEnter, setShouldSubmitOnEnter] = useState(true);
  const [shouldAutoSize, setShouldAutoSize] = useState(true);

  const textarea = textareaRef.current;

  const resetSize = () => {
    if (!textarea) return;
    textarea.style.height = "auto";
  };

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
    const handleAutoSize = () => {
      if (!textarea) return;
      textarea.style.height = "auto";

      const textareaStyles = getComputedStyle(textarea);
      const maxHeight = parseInt(textareaStyles.maxHeight);

      textarea.style.height = `${textarea.scrollHeight}px`;

      textarea.scrollHeight > maxHeight
        ? (textarea.style.overflowY = "auto")
        : (textarea.style.overflowY = "hidden");
    };

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
  }, [textarea, shouldAutoSize]);

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
  };
};

export default useTextarea;
