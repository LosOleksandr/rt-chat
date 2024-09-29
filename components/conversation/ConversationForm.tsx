"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Input from "../ui/input";
import FileInput from "../ui/file-input";
import {
  IconCirclePlus,
  IconPhotoPlus,
  IconSend2,
  IconX,
} from "@tabler/icons-react";
import instance from "@/lib/instance";
import useConversations from "@/hooks/useConversations";
import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import getFileUri from "@/lib/utils/getFileUri";
import Heading from "../ui/heading";
import Image from "next/image";

const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

export type TConversationFormData = {
  image: string;
  messageField: string;
};

const ConversationForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TConversationFormData>();
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const { conversationId } = useConversations();
  const { isOpen, onClose, onOpen } = useModal();

  const handleUploadedFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = await Promise.all(
        Array.from(files).map(async (file) => {
          const fileUri = await getFileUri(file);
          setValue("image", fileUri);
          return URL.createObjectURL(file);
        })
      );
      setPreviewPhotos((prev) => [...prev, ...filePreviews]);
      onOpen();
    }
  };

  const onModalClose = () => {
    setPreviewPhotos([]);
    onClose();
  };

  const deletePhotoPreview = (preview: string) => {
    const updatedPreviews = previewPhotos.filter((pr) => pr !== preview);
    if (updatedPreviews.length === 0) onClose();
    setPreviewPhotos(updatedPreviews);
  };

  const onSubmit = async (data: TConversationFormData) => {
    try {
      await instance.post("/api/messages/create", {
        conversationId,
        message: data.messageField,
        image: data.image,
      });
      reset();
      if (isOpen) onModalClose();
    } catch (error) {
      console.error("Error submitting message: ", error);
    }
  };

  return (
    <>
      <div className="border-t border-border p-4">
        <form
          className="grid grid-cols-[minmax(0,_1fr)_40px] max-w-xl mx-auto gap-2 items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <FileInput
              //@ts-expect-error temp undefined type problem
              size="md"
              variant="fixed_bottom_left"
              {...register("image", { onChange: handleUploadedFile })}
              asChild
            >
              <IconPhotoPlus className="w-full h-full" />
            </FileInput>
            <Input
              as="textarea"
              type="text"
              variant="input"
              placeholder="Type a message here..."
              errors={errors}
              {...register("messageField")}
              className="py-3 pl-9 rounded-xl"
              maxLength={450}
            />
          </div>
          <Button
            type="submit"
            className="rounded-full p-0 h-12 w-12 transition-all"
            title="Send Message"
          >
            <IconSend2 className="w-5 h-5" />
          </Button>
        </form>
      </div>
      {isOpen && (
        <Modal onClose={onModalClose}>
          <form
            className="bg-background-secondary mx-auto max-w-xl w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex p-2 justify-between items-center border-b border-border bg-background">
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" onClick={onModalClose}>
                  <IconX />
                </Button>
                <Heading as="h2" size="xl">
                  Send Photo
                </Heading>
              </div>
              <FileInput
                {...register("image", { onChange: handleUploadedFile })}
              >
                <IconCirclePlus />
              </FileInput>
            </div>
            <ul
              className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-2 ${
                previewPhotos.length > 2 ? "" : "xs:justify-center"
              }`}
            >
              {previewPhotos.map((pr) => (
                <li
                  key={pr}
                  className="relative group w-full xs:w-[calc(50%-8px)] h-96 cursor-pointer snap-center flex-shrink-0"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group-hover:opacity-100 z-50 absolute top-0 right-0 opacity-0 hover:text-danger-hover transition-opacity text-primary-foreground"
                    onClick={() => deletePhotoPreview(pr)}
                  >
                    <IconX />
                  </Button>
                  <Image src={pr} alt="Preview" fill className="object-cover" />
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-[minmax(0,_1fr)_100px] gap-2 p-2 border-t border-border bg-background">
              <Input
                as="textarea"
                variant="ghost"
                placeholder="Add a caption..."
                className="basis-full"
                {...register("messageField")}
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ConversationForm;
