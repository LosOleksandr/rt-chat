"use client";

import React, { ChangeEvent, MouseEvent, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import instance from "@/lib/instance";
import useConversations from "@/hooks/useConversations";
import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import getFileUri from "@/lib/utils/getFileUri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTextarea from "@/hooks/useTextarea";
import { AxiosError } from "axios";
import { Button } from "../ui/button";
import { IconMoodSmile, IconPhotoPlus } from "@tabler/icons-react";
import { Textarea } from "../ui/textarea";
import FileInput from "../ui/file-input";
import { IconSend2 } from "@tabler/icons-react";

const ImageUploadModal = dynamic(
  () => import("@/components/modals/ImageUploadModal"),
  { ssr: false }
);

export type TConversationFormData = {
  image: File[] | null;
  message: string;
  caption: string;
};

const schema = z.object({
  message: z.string().min(1).optional(),
  image: z.array(z.instanceof(File)).nullable().optional(),
  caption: z.string().min(1).optional(),
});

const ConversationForm = () => {
  const methods = useForm<TConversationFormData>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const { conversationId } = useConversations();
  const { isOpen, onClose, onOpen } = useModal();
  const { textareaRef, resetSize } = useTextarea(formRef);

  const messageValue = methods.watch("message");

  const { ref, ...rest } = methods.register("message");

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      const imageFiles: File[] = Array.from(files);
      methods.setValue("image", imageFiles);
      resetSize();
      onOpen();
    }
  };

  const resetFileInput = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const handleReset = () => {
    methods.reset();
    resetSize();
    if (isOpen) onClose();
  };

  const onSubmit = async (data: TConversationFormData) => {
    try {
      const fileUris =
        data.image && data.image.length
          ? await Promise.all(data.image.map((file) => getFileUri(file)))
          : null;

      await instance.post("/api/messages/create", {
        conversationId,
        message: data.message || data.caption,
        image: fileUris?.[0],
      });

      handleReset();
    } catch (error) {
      if (error instanceof AxiosError) {
        methods.setError("root", {
          type: "server",
          message: error.response?.data?.message || "An error occurred",
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="border-t border-border p-4">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto sm:max-w-lg h-full"
          ref={formRef}
        >
          <div className="flex w-full items-end gap-2">
            <div
              className={`flex-1 w-full flex border-2 border-border rounded-md items-end px-2 transition-transform ${
                messageValue ? "translate-x-0" : "translate-x-10"
              }`}
            >
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="pb-4"
              >
                <IconMoodSmile />
              </Button>
              <Textarea
                {...rest}
                variant="ghost"
                placeholder="Type a message here..."
                ref={(e) => {
                  ref(e);
                  textareaRef.current = e;
                }}
              />
              <FileInput
                onChange={onFileSelect}
                onClick={resetFileInput}
                className="pb-2"
                multiple
              >
                <IconPhotoPlus />
              </FileInput>
            </div>

            <Button
              type="submit"
              disabled={methods.formState.isSubmitting}
              className={`transition-all rounded-full p-0 h-12 w-12 ${
                messageValue
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 -translate-x-10 pointer-events-none scale-0"
              }`}
              title="Send Message"
            >
              <IconSend2 className="w-5 h-5" />
            </Button>
          </div>
          {isOpen && <ImageUploadModal onClose={onClose} formRef={formRef} />}
        </form>
      </div>
    </FormProvider>
  );
};

export default ConversationForm;
