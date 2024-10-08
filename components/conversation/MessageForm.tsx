import React, { ChangeEvent, MouseEvent, MutableRefObject } from "react";
import { Button } from "../ui/button";
import { IconMoodSmile, IconPhotoPlus, IconSend2 } from "@tabler/icons-react";
import FileInput from "../ui/file-input";
import { useFormContext } from "react-hook-form";
import { TConversationFormData } from "./ConversationForm";
import { Textarea } from "../ui/textarea";

type TMessageForm = {
  onFileSelect: (files: FileList) => void;
  textareaProps: {
    textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
    disableAutoSize: () => void;
    disableSumbitOnEnter: () => void;
  };
};

const MessageForm = ({ onFileSelect, textareaProps }: TMessageForm) => {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useFormContext<TConversationFormData>();
  const messageValue = watch("message");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) onFileSelect(selectedFiles);
  };

  const resetFileInput = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const { ref, ...rest } = register("message");

  return (
    <div className="flex w-full items-end gap-2">
      <div className="flex-1 flex border-2 border-border rounded-md items-end px-2">
        <Button type="button" size="icon" variant="ghost" className="pb-4">
          <IconMoodSmile />
        </Button>
        <Textarea
          {...rest}
          variant="ghost"
          placeholder="Type a message here..."
          ref={(e) => {
            ref(e);
            textareaProps.textareaRef.current = e;
          }}
        />
        <FileInput
          onChange={handleFileChange}
          onClick={resetFileInput}
          className="pb-2"
          multiple
        >
          <IconPhotoPlus />
        </FileInput>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`transition-all rounded-full p-0 h-12 w-12 ${
          messageValue
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-10 pointer-events-none"
        }`}
        title="Send Message"
      >
        <IconSend2 className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default MessageForm;
