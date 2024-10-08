"use client";

import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import instance from "@/lib/instance";
import useConversations from "@/hooks/useConversations";
import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import getFileUri from "@/lib/utils/getFileUri";
import MessageForm from "./MessageForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTextarea from "@/hooks/useTextarea";
import { AxiosError } from "axios";

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

  console.log(methods.formState.errors);
  console.log(methods.watch());
  const formRef = useRef<HTMLFormElement | null>(null);
  const { conversationId } = useConversations();
  const { isOpen, onClose, onOpen } = useModal();
  const { textareaRef, resetSize, disableAutoSize, disableSumbitOnEnter } =
    useTextarea(formRef);

  const onFileSelect = (files: FileList) => {
    if (files?.length) {
      const imageFiles: File[] = Array.from(files);
      methods.setValue("image", imageFiles);
      onOpen();
    }
  };

  const handleReset = () => {
    methods.reset();
    resetSize();
    if (isOpen) onClose();
  };

  const onSubmit = async (data: TConversationFormData) => {
    console.log("data: ", data);
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
          className="mx-auto max-w-lg h-full"
          ref={formRef}
        >
          <MessageForm
            onFileSelect={onFileSelect}
            textareaProps={{
              textareaRef,
              disableAutoSize,
              disableSumbitOnEnter,
            }}
          />
          {isOpen && <ImageUploadModal onClose={onClose} formRef={formRef} />}
        </form>
      </div>
    </FormProvider>
  );
};

export default ConversationForm;
